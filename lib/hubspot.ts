const HUBSPOT_API_BASE = "https://api.hubapi.com";

function getAccessToken(): string {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");
  }
  return token;
}

function headers(): HeadersInit {
  return {
    Authorization: `Bearer ${getAccessToken()}`,
    "Content-Type": "application/json",
  };
}

export interface HubSpotContactProperties {
  firstname: string;
  lastname: string;
  email: string;
  company?: string;
  synteq_product_interest?: string;
  synteq_budget?: string;
  synteq_team_size?: string;
  message?: string;
  website_contact_form_submission?: string;
}

export interface HubSpotCompanyProperties {
  name: string;
  synteq_team_size?: string;
  website_contact_form_submission?: string;
}

interface HubSpotObject {
  id: string;
  properties: Record<string, string>;
}

/**
 * Create a new contact in HubSpot, or update if the email already exists (409 Conflict).
 */
export async function createOrUpdateContact(
  properties: HubSpotContactProperties
): Promise<{ id: string; created: boolean }> {
  const createRes = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ properties }),
  });

  if (createRes.ok) {
    const contact = (await createRes.json()) as HubSpotObject;
    return { id: contact.id, created: true };
  }

  // 409 = contact with this email already exists
  if (createRes.status === 409) {
    const existing = await findContactByEmail(properties.email);
    if (!existing) {
      throw new Error("Contact exists but could not be found by email");
    }

    const updateRes = await fetch(
      `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${existing.id}`,
      {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({ properties }),
      }
    );

    if (!updateRes.ok) {
      const errorBody = await updateRes.text();
      throw new Error(`Failed to update contact: ${updateRes.status} ${errorBody}`);
    }

    return { id: existing.id, created: false };
  }

  const errorBody = await createRes.text();
  throw new Error(`Failed to create contact: ${createRes.status} ${errorBody}`);
}

/**
 * Search for a contact by email address.
 */
export async function findContactByEmail(
  email: string
): Promise<{ id: string } | null> {
  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "email",
              operator: "EQ",
              value: email,
            },
          ],
        },
      ],
      limit: 1,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to search contacts: ${res.status} ${errorBody}`);
  }

  const data = (await res.json()) as { results: HubSpotObject[] };
  if (data.results.length === 0) {
    return null;
  }

  return { id: data.results[0].id };
}

/**
 * Create a new company in HubSpot, or find existing by name.
 */
export async function createOrUpdateCompany(
  properties: HubSpotCompanyProperties
): Promise<{ id: string; created: boolean }> {
  // Search for existing company by name first
  const existing = await findCompanyByName(properties.name);
  if (existing) {
    const updateRes = await fetch(
      `${HUBSPOT_API_BASE}/crm/v3/objects/companies/${existing.id}`,
      {
        method: "PATCH",
        headers: headers(),
        body: JSON.stringify({ properties }),
      }
    );

    if (!updateRes.ok) {
      const errorBody = await updateRes.text();
      throw new Error(`Failed to update company: ${updateRes.status} ${errorBody}`);
    }

    return { id: existing.id, created: false };
  }

  const createRes = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/companies`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ properties }),
  });

  if (!createRes.ok) {
    const errorBody = await createRes.text();
    throw new Error(`Failed to create company: ${createRes.status} ${errorBody}`);
  }

  const company = (await createRes.json()) as HubSpotObject;
  return { id: company.id, created: true };
}

/**
 * Search for a company by name.
 */
async function findCompanyByName(
  name: string
): Promise<{ id: string } | null> {
  const res = await fetch(`${HUBSPOT_API_BASE}/crm/v3/objects/companies/search`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            {
              propertyName: "name",
              operator: "EQ",
              value: name,
            },
          ],
        },
      ],
      limit: 1,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to search companies: ${res.status} ${errorBody}`);
  }

  const data = (await res.json()) as { results: HubSpotObject[] };
  if (data.results.length === 0) {
    return null;
  }

  return { id: data.results[0].id };
}

/**
 * Associate a contact with a company in HubSpot.
 */
/**
 * Add a contact to a HubSpot static list by list ID.
 */
export async function addContactToList(
  listId: string,
  contactId: string
): Promise<void> {
  const res = await fetch(
    `${HUBSPOT_API_BASE}/crm/v3/lists/${listId}/memberships/add`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify([contactId]),
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to add contact to list: ${res.status} ${errorBody}`);
  }
}

export async function associateContactToCompany(
  contactId: string,
  companyId: string
): Promise<void> {
  const res = await fetch(
    `${HUBSPOT_API_BASE}/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify([
        {
          associationCategory: "HUBSPOT_DEFINED",
          associationTypeId: 1,
        },
      ]),
    }
  );

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to associate contact to company: ${res.status} ${errorBody}`);
  }
}
