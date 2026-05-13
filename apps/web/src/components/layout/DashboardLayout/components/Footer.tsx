import { SiFacebook, SiWordpress, SiYoutube } from '@icons-pack/react-simple-icons';
import { Link } from '@tanstack/react-router';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200/80 bg-linear-to-b from-white to-gray-50/50">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="col-span-1 sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/fcode.png" alt="F-Code" className="h-9 w-9" />
                <div className="bg-primary/20 absolute inset-0 rounded-full opacity-50 blur-lg"></div>
              </div>
              <span className="text-primary text-2xl font-bold tracking-tight">F-Code</span>
            </div>
            <p className="mt-4 text-justify text-sm leading-relaxed text-gray-600">
              Nền tảng tổ chức và quản lý các cuộc thi lập trình chuyên nghiệp của CLB F-Code. Từ các trận đấu CSS
              Battle đầy sáng tạo đến những cuộc thi thuật toán thách thức, chúng tôi xây dựng môi trường để sinh viên
              rèn luyện tư duy và kỹ năng lập trình đỉnh cao.
            </p>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">Liên kết</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Cuộc thi
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Bảng xếp hạng
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Thư viện đề
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/WvudrJaYD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all"
                >
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Discord Support
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">Tài nguyên</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#" className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all">
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Tài liệu hướng dẫn
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all">
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Quy định & Thể lệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all">
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  FAQ (Câu hỏi thường gặp)
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary group flex items-center text-sm text-gray-600 transition-all">
                  <span className="group-hover:bg-primary mr-2 h-1 w-1 rounded-full bg-gray-400 transition-all group-hover:w-2"></span>
                  Cộng đồng Discord
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">Liên hệ</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="https://www.facebook.com/fcodeclub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-primary group hover:border-primary flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-xs transition-all hover:scale-110 hover:text-blue-600"
              >
                <SiFacebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCZyrUXSrQ1AdkomxYz1GvCw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-primary group hover:border-primary flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-xs transition-all hover:scale-110 hover:text-red-500"
              >
                <SiYoutube className="h-4 w-4" />
              </a>
              <a
                href="https://fcodehcm.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:bg-primary group hover:border-primary flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white shadow-xs transition-all hover:scale-110 hover:text-blue-500"
              >
                <SiWordpress className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 sm:mt-10 sm:pt-8">
          <p className="text-center text-sm text-gray-500">
            Dự án được thiết kế bởi:{' '}
            <a
              className="text-primary font-medium transition-colors hover:underline"
              target="_blank"
              href="https://www.facebook.com/fcodeclub"
            >
              CLB F-Code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
