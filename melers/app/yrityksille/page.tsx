import Nav from "../components/Nav";
import ForBusinesses from "../components/ForBusinesses";
import Footer from "../components/Footer";

export const metadata = {
  title: "Yrityksille — Melers Pesulapalvelut",
  description: "Luotettava tekstiilihuoltokumppani hoivakodeille, hotelleille ja ravintoloille Turussa. Joustavat sopimukset, säännölliset noudot.",
};

export default function Yrityksille() {
  return (
    <>
      <Nav />
      <div className="pt-16">
        <ForBusinesses />
      </div>
      <Footer />
    </>
  );
}
