import Logo from "../../components/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-20">
      <div className="container mx-auto p-10">
        <div className="footer">
          <div>
            <Logo />
            <p className="font-bold text-lg">
              StockWorld
              <br />
              <span className="font-normal text-sm opacity-70">
                Your trusted inventory management partner
              </span>
            </p>
          </div>
          <div>
            <span className="footer-title">Services</span>
            <a className="link link-hover">Inventory Management</a>
            <a className="link link-hover">Stock Tracking</a>
            <a className="link link-hover">Product Analytics</a>
            <a className="link link-hover">Supplier Management</a>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Careers</a>
            <a className="link link-hover">Blog</a>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </div>
        </div>
        <div className="mt-10 text-center text-sm opacity-50">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            StockWorld
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;