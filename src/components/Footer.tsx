import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <h3 className="text-xl font-bold">{t('app.title')}</h3>
            </div>
            <p className="text-white/70 text-sm">{t('app.tagline')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">{t('nav.home')}</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">{t('nav.courses')}</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">{t('nav.about')}</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-semibold mb-4">{t('courses.title')}</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">{t('courses.ielts')}</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">{t('courses.sat')}</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">{t('courses.business')}</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">{t('courses.arabic')}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">{t('footer.terms')}</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <p className="text-center text-white/60 text-sm">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
