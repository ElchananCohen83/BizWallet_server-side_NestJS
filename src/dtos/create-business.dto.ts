export class CreateBusinessDto {
    readonly name: string;
    readonly email?: string | null;
    readonly password_hash?: string | null;
    readonly address?: string | null;
    readonly country?: string | null;
    readonly latitude?: number | null;
    readonly longitude?: number | null;
    readonly phone_number?: string | null;
    readonly additional_phone?: string | null;
    readonly created_at?: Date | null;
    readonly updated_at?: Date | null;
    readonly comments?: string | null;
    readonly is_active?: boolean;
    readonly total_passes?: number | null;
    readonly total_active_cards?: number | null;
    readonly subscription_tier?: string | null;
    readonly contact_person_first_name?: string | null;
    readonly contact_person_last_name?: string | null;
    readonly contact_person_phone_number?: string | null;
    readonly logo?: string | null;
    readonly website?: string | null;
  }
  