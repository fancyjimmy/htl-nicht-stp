CREATE
OR REPLACE FUNCTION check_user_role (user_id UUID, role user_role_enum)
RETURNS BOOL
LANGUAGE SQL
SECURITY DEFINER
AS
$$
SELECT EXISTS(SELECT id
              FROM profile
              WHERE ((id = $1) AND ($2 = role)))
           $$;

CREATE
OR REPLACE FUNCTION has_valid_account (user_id UUID)
RETURNS BOOL
LANGUAGE SQL
SECURITY DEFINER
AS
$$
SELECT EXISTS(SELECT id
              FROM profile
              WHERE ((id = $1) AND enabled))
           $$;


-- Abteilungssprecher only
check_user_role
(auth.uid(), 'ABTEILUNGSSPRECHER'::user_role_enum)

-- Klassensprecher only
check_user_role(auth.uid(), 'KLASSENSPRECHER'::user_role_enum)


-- Klassensprecher and above
check_user_role(auth.uid(), 'KLASSENSPRECHER'::user_role_enum) or check_user_role(auth.uid(), 'ABTEILUNGSSPRECHER'::user_role_enum)

-- Anyone with a profile
check_user_role(auth.uid(), 'USER'::user_role_enum) or check_user_role(auth.uid(), 'KLASSENSPRECHER'::user_role_enum) or check_user_role(auth.uid(), 'ABTEILUNGSSPRECHER'::user_role_enum)
