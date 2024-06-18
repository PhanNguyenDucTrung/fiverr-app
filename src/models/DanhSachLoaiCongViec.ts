interface LoaiCongViec {
    id: number;
    tenLoaiCongViec: string;
}

interface DanhSachLoaiCongViec {
    statusCode: number;
    content: LoaiCongViec[];
    dateTime: string;
}

export type { DanhSachLoaiCongViec, LoaiCongViec };
