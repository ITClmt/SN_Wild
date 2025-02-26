import { Link } from "react-router-dom";

export default function FirstPage() {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[70vh] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-primary">CampCoders</h1>
            <p className="text-xl text-neutral-500 mt-2">
              "Code, Connect, Create."
            </p>
            <p className="py-6 text-xl">
              Bienvenue sur le réseau social exclusif des Wilders ! Restez
              connectés avec vos camarades de promotion, partagez vos succès et
              continuez l'aventure Wild ensemble.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="btn btn-primary">
                Se connecter
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pourquoi rejoindre notre communauté ?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title">Restez Connectés</h3>
                <p>
                  Gardez le contact avec votre promotion et suivez les parcours
                  de chacun
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title">Partagez</h3>
                <p>
                  Échangez vos expériences, vos projets et vos conseils
                  techniques
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <h3 className="card-title">Évoluez</h3>
                <p>
                  Développez votre réseau professionnel dans le monde du
                  développement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://itclmt-portfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="link link-secondary"
            >
              ITClmt
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
