export default interface IUser {
    id: string;
    roleId: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    birthdate: Date;
    registeredAt: Date;
    deletedAt: Date;
    role: Role;
}

interface Role {
    description: string;
    canCreate: number;
    canRead: number;
    canUpdate: number;
    canDelete: number;
}
