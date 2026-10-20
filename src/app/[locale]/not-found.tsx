import { Link } from "@/i18n/navigation";

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
    <h1 className="font-display text-4xl text-sea">404</h1>
    <p className="mt-3 text-muted">Page not found</p>
    <Link
      href="/"
      className="mt-8 rounded-sm bg-sea px-6 py-3 text-sm font-semibold text-white"
    >
      Home
    </Link>
  </div>
);

export default NotFound;
