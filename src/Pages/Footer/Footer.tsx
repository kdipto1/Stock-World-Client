
const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content mt-20">
      <div>
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current text-primary"
        >
          <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"></path>
        </svg>
        <p>
          <span className="font-bold text-primary text-lg">StockWorld</span>
          <br />
          <span className="text-sm opacity-70">Your trusted inventory management partner</span>
        </p>
      </div>
      <div>
        <span className="footer-title text-primary">Services</span>
        <a className="link link-hover hover:text-primary transition-colors">Inventory Management</a>
        <a className="link link-hover hover:text-primary transition-colors">Stock Tracking</a>
        <a className="link link-hover hover:text-primary transition-colors">Product Analytics</a>
        <a className="link link-hover hover:text-primary transition-colors">Supplier Management</a>
      </div>
      <div>
        <span className="footer-title text-primary">Company</span>
        <a className="link link-hover hover:text-primary transition-colors">About us</a>
        <a className="link link-hover hover:text-primary transition-colors">Contact</a>
        <a className="link link-hover hover:text-primary transition-colors">Careers</a>
        <a className="link link-hover hover:text-primary transition-colors">Blog</a>
      </div>
      <div>
        <span className="footer-title text-primary">Legal</span>
        <a className="link link-hover hover:text-primary transition-colors">Terms of use</a>
        <a className="link link-hover hover:text-primary transition-colors">Privacy policy</a>
        <a className="link link-hover hover:text-primary transition-colors">Cookie policy</a>
      </div>
    </footer>
  );
};

export default Footer;
