import { execute, isDatabaseConfigured, queryRows, type RowDataPacket } from "@/lib/db/mysql";
import type { ContactPayload, LeadStatus } from "@/types";

export async function storeLead(
  payload: ContactPayload,
  source = "contact_form",
): Promise<{ stored: boolean }> {
  if (!isDatabaseConfigured()) return { stored: false };

  await execute(
    `INSERT INTO website_leads
      (name, organization, email, phone, service_interest, message, consent, status, source, created_at)
     VALUES
      (:name, :organization, :email, :phone, :serviceInterest, :message, :consent, 'New', :source, UTC_TIMESTAMP())`,
    {
      name: payload.name,
      organization: payload.organization,
      email: payload.email,
      phone: payload.phone || null,
      serviceInterest: payload.serviceInterest,
      message: payload.message,
      consent: payload.consent ? 1 : 0,
      source,
    },
  );

  return { stored: true };
}

export interface LeadRow extends RowDataPacket {
  id: number;
  name: string;
  organization: string;
  email: string;
  phone: string | null;
  service_interest: string;
  message: string;
  consent: number;
  status: LeadStatus;
  source: string;
  created_at: Date;
}

export async function listLeads(filters?: {
  status?: LeadStatus;
  q?: string;
}): Promise<LeadRow[]> {
  if (!isDatabaseConfigured()) return [];

  let sql = `SELECT * FROM website_leads WHERE 1=1`;
  const params: Record<string, string | number | boolean | null> = {};

  if (filters?.status) {
    sql += ` AND status = :status`;
    params.status = filters.status;
  }
  if (filters?.q) {
    sql += ` AND (name LIKE :q OR organization LIKE :q OR email LIKE :q OR service_interest LIKE :q)`;
    params.q = `%${filters.q}%`;
  }

  sql += ` ORDER BY created_at DESC LIMIT 200`;
  const rows = await queryRows<LeadRow[]>(sql, params);
  return rows ?? [];
}

export async function updateLeadStatus(id: number, status: LeadStatus) {
  if (!isDatabaseConfigured()) return false;
  await execute(`UPDATE website_leads SET status = :status WHERE id = :id`, { status, id });
  return true;
}
