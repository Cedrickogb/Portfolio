import { NextResponse } from 'next/server';
import { SMTPClient } from 'emailjs';

/**
 * Réception du formulaire de contact.
 *
 * L'envoi passe par SMTP côté serveur, jamais depuis le navigateur : des
 * identifiants de messagerie livrés au client sont des identifiants publics.
 *
 * Configuration attendue (variables d'environnement) :
 *   SMTP_HOST      hôte SMTP, ex. smtp.gmail.com
 *   SMTP_USER      compte d'envoi
 *   SMTP_PASSWORD  mot de passe d'application
 *   SMTP_PORT      optionnel, 465 par défaut (TLS implicite)
 *   CONTACT_TO     adresse de réception
 *
 * Tant qu'elles ne sont pas renseignées, la route répond 503 avec un motif
 * explicite plutôt que d'échouer silencieusement — l'interface le signale au
 * visiteur au lieu d'avaler son message.
 */

const MAX = { name: 80, email: 120, message: 2000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Payload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

function readField(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length === 0 || trimmed.length > max ? null : trimmed;
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid-json' }, { status: 400 });
  }

  const name = readField(body.name, MAX.name);
  const email = readField(body.email, MAX.email);
  const message = readField(body.message, MAX.message);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'invalid-fields' }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, SMTP_PORT, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_TO) {
    return NextResponse.json({ error: 'not-configured' }, { status: 503 });
  }

  try {
    const client = new SMTPClient({
      host: SMTP_HOST,
      user: SMTP_USER,
      password: SMTP_PASSWORD,
      port: SMTP_PORT ? Number(SMTP_PORT) : 465,
      ssl: true,
    });

    await client.sendAsync({
      // L'expéditeur reste le compte authentifié ; l'adresse du visiteur passe
      // en `reply-to`, sinon la plupart des serveurs rejettent le message.
      from: SMTP_USER,
      to: CONTACT_TO,
      'reply-to': `${name} <${email}>`,
      subject: `Portfolio — message de ${name}`,
      text: `${message}\n\n—\n${name} <${email}>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] envoi impossible :', error);
    return NextResponse.json({ error: 'send-failed' }, { status: 502 });
  }
}
