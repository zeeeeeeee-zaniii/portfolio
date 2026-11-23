const HERO_PHOTO_URL =
  "https://rltxedmwdojuovlblkea.supabase.co/storage/v1/object/public/site-assets/portfolio-hero.webp";

export default function HeroArt() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={HERO_PHOTO_URL}
      alt="Zainab Fatima working at her desk on a laptop"
      className="hero-photo"
      loading="eager"
    />
  );
}
