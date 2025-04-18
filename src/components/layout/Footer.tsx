
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-glow-100">
      <div className="container px-4 py-8 mx-auto md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-glow-700">
              Glow<span className="text-glow-500">Hub</span>
            </h2>
            <p className="text-sm text-gray-600">
              Connecting clients with top beauty professionals for in-home salon services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-glow-500 hover:text-glow-700">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-glow-500 hover:text-glow-700">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-glow-500 hover:text-glow-700">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-glow-700">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services?category=hair" className="text-gray-600 hover:text-glow-700">Hair Styling</Link>
              </li>
              <li>
                <Link to="/services?category=makeup" className="text-gray-600 hover:text-glow-700">Makeup</Link>
              </li>
              <li>
                <Link to="/services?category=nails" className="text-gray-600 hover:text-glow-700">Nail Care</Link>
              </li>
              <li>
                <Link to="/services?category=facial" className="text-gray-600 hover:text-glow-700">Facials</Link>
              </li>
              <li>
                <Link to="/services?category=massage" className="text-gray-600 hover:text-glow-700">Massage</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-glow-700">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-glow-700">About Us</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-600 hover:text-glow-700">Careers</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-glow-700">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-glow-700">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-glow-700">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-glow-700">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-glow-700">Terms of Service</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-glow-700">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 mt-8 border-t border-glow-100">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} GlowHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
