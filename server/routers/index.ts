//Routers
import authRouter from './authRouters'
import tacGiaRouter from './tacGiaRouters'
import nxbRouter from './nhaXuatBanRouters'
import theLoaiRouter from './theLoaiRouters'
import xuatBanSachRouter from './xuatBanSachRouters'
import ttSRouter from './thongTinSachRouters'
import ttTLRouter from './thongTinTheLoaiRouters'
import phieuMuonRouter from './phieuMuonRouters'
import sachRouter from './sachRouters'
import wakeUpRouter from './wakeUpCallRouters'

const routers = {
    authRouter,
    tacGiaRouter,
    nxbRouter,
    theLoaiRouter,
    xuatBanSachRouter,
    ttSRouter,
    ttTLRouter,
    phieuMuonRouter,
    sachRouter,
    wakeUpRouter
};
export default routers;