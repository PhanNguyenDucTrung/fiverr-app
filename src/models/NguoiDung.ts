interface NguoiDung {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
    avatar: string;
    gender: boolean;
    role: string;
    skill: string[] | null;
    certification: string[] | null;
    bookingJob: string[] | null;
}

interface DanhSachNguoiDung {
    nguoiDung: NguoiDung[];
}

export type { NguoiDung, DanhSachNguoiDung };
