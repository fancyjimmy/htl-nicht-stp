export const ROLES = {
    USER: 'USER',
    KLASSENSPRECHER: 'KLASSENSPRECHER',
    ABTEILUNGSSPRECHER: 'ABTEILUNGSSPRECHER',
};

export const MINIMUM_ROLE = {
    USER: [ROLES.USER, ROLES.KLASSENSPRECHER, ROLES.ABTEILUNGSSPRECHER],
    KLASSENSPRECHER: [ROLES.KLASSENSPRECHER, ROLES.ABTEILUNGSSPRECHER],
    ABTEILUNGSSPRECHER: [ROLES.ABTEILUNGSSPRECHER],
}

export type ObjectValues<T> = T[keyof T];

export type Role = ObjectValues<typeof ROLES>;

export type Profile = {
    id: string,
    color: string,
    icon: string,
    grade: number,
    fullname: string,
    className: string,
    role: Role,
    enabled: boolean
}
