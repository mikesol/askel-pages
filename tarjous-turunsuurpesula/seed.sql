-- HOTELLIT (vat 25.5)
INSERT INTO pricing_catalog (industry, description, unit, min_price, max_price, default_vat_rate, sort_order) VALUES
('hotellit', 'Vuokratekstiili viikkovuokra', 'kpl/vko', 10.00, 30.00, 25.5, 1),
('hotellit', 'Täkit (peitot)', 'kpl', 3.00, 20.00, 25.5, 2),
('hotellit', 'Tyynyt', 'kpl', 1.30, 7.95, 25.5, 3),
('hotellit', 'Pyyhkeet, iso', 'kpl', 1.00, 1.80, 25.5, 4),
('hotellit', 'Pyyhkeet, pieni', 'kpl', 0.50, 1.50, 25.5, 5),
('hotellit', 'Lakana', 'kpl', 0.95, 1.50, 25.5, 6),
('hotellit', 'Tyynyliina', 'kpl', 0.30, 1.00, 25.5, 7),
('hotellit', 'Pussilakana', 'kpl', 1.20, 2.00, 25.5, 8),
('hotellit', 'Lakana', 'kg', 1.70, 3.50, 25.5, 9),
('hotellit', 'Pussilakana', 'kg', 1.70, 3.50, 25.5, 10),
('hotellit', 'Pyyhe', 'kg', 1.70, 3.50, 25.5, 11),
('hotellit', 'Tyynyliina', 'kg', 1.70, 3.50, 25.5, 12),
('hotellit', 'Kuljetus 0-5 km / käynti', 'käynti', 9.03, 9.03, 25.5, 13),
('hotellit', 'Kuljetus 5-10 km / käynti', 'käynti', 15.00, 15.00, 25.5, 14),
('hotellit', 'Kuljetus 10-25 km / käynti', 'käynti', 20.00, 20.00, 25.5, 15);

-- PALVELUTALOT (vat 0)
INSERT INTO pricing_catalog (industry, description, unit, min_price, max_price, default_vat_rate, sort_order) VALUES
('palvelutalot', 'Tyynyliina', 'kg', 2.20, 3.00, 0, 1),
('palvelutalot', 'Pussilakana', 'kg', 2.20, 3.00, 0, 2),
('palvelutalot', 'Pyyhe', 'kg', 2.20, 3.00, 0, 3),
('palvelutalot', 'Lakana', 'kg', 2.20, 3.50, 0, 4),
('palvelutalot', 'Liukulakana', 'kg', 2.20, 3.00, 0, 5),
('palvelutalot', 'Vaatteet', 'kg', 5.00, 6.00, 0, 6),
('palvelutalot', 'Täkit', 'kg', 7.00, 9.00, 0, 7),
('palvelutalot', 'Tyynyt', 'kg', 7.01, 9.01, 0, 8),
('palvelutalot', 'Vuodesuojat', 'kpl', 4.30, 5.00, 0, 9),
('palvelutalot', 'Pussilakana', 'kpl', 1.20, 2.00, 0, 10),
('palvelutalot', 'Tyynyliina', 'kpl', 0.30, 1.00, 0, 11),
('palvelutalot', 'Lakana', 'kpl', 0.95, 1.50, 0, 12),
('palvelutalot', 'Täkit (peitot)', 'kpl', 12.00, 20.00, 0, 13),
('palvelutalot', 'Tyynyt', 'kpl', 1.30, 5.00, 0, 14),
('palvelutalot', 'Päiväpeitot 120cm', 'kpl', 12.00, 20.00, 0, 15),
('palvelutalot', 'Pyyhkeet, iso', 'kpl', 1.00, 1.80, 0, 16),
('palvelutalot', 'Pyyhkeet, pieni', 'kpl', 0.50, 1.50, 0, 17),
('palvelutalot', 'Verhot, kevyt (mankeli/silitys)', 'm²', 5.42, 5.42, 0, 18),
('palvelutalot', 'Verhot, käsityö (raskas käsityö)', 'm²', 7.80, 7.80, 0, 19),
('palvelutalot', 'Kuljetus 0-5 km / käynti', 'käynti', 9.03, 9.03, 0, 20),
('palvelutalot', 'Kuljetus 5-10 km / käynti', 'käynti', 15.00, 15.00, 0, 21),
('palvelutalot', 'Kuljetus 10-25 km / käynti', 'käynti', 20.00, 20.00, 0, 22);

-- TYOASUT (vat 25.5)
INSERT INTO pricing_catalog (industry, description, unit, min_price, max_price, default_vat_rate, sort_order) VALUES
('tyoasut', 'Silitetty / prässätty', 'kpl', 6.00, 8.00, 25.5, 1),
('tyoasut', 'Höyrytunneli', 'kpl', 4.00, 6.00, 25.5, 2);

-- HATAPESUT (vat 25.5) — no fixed rate card yet, seeded with placeholder call-out row so the admin
-- knows to fill this in via Ylläpito rather than leaving the industry empty.
INSERT INTO pricing_catalog (industry, description, unit, min_price, max_price, default_vat_rate, sort_order) VALUES
('hatapesut', 'Vahinkopesu, arvioidaan tapauskohtaisesti', 'kg', 3.00, 6.00, 25.5, 1);

-- VUOKRATEKSTIILIT (vat 25.5)
INSERT INTO pricing_catalog (industry, description, unit, min_price, max_price, default_vat_rate, sort_order) VALUES
('vuokratekstiilit', 'Vuokratekstiili viikkovuokra', 'kpl/vko', 10.00, 30.00, 25.5, 1),
('vuokratekstiilit', 'Työasu, viikkovuokra', 'kpl/vko', 4.00, 8.00, 25.5, 2);

INSERT INTO industry_content (industry, selling_points_fi, selling_points_en) VALUES
('palvelutalot',
 'ALV 0% viranomaisen myöntämänä vanhuspalvelujen tukipalveluna — säästö näkyy suoraan kustannuksissanne.
Hoitohenkilökunnan ei tarvitse pestä tai kuivattaa pyykkiä itse — aikaa jää hoitotyöhön.
Prosessimme täyttää sosiaali- ja terveydenhuollon tekstiilihuollon vaatimukset.
Hygieniapussit tartuntariskin sisältäville tekstiileille, yksilöllinen merkintä sekaantumisen estämiseksi.',
 'VAT 0% as an authority-granted elderly-care support service — the saving shows directly in your costs.
Care staff never have to wash or dry laundry themselves — that time goes back into care work.
Our process meets social and healthcare textile-care requirements.
Hygiene bags for contamination-risk items, individual marking to prevent mix-ups.'),
('hotellit',
 'Skaalaamme palvelun ylös sesonkihuippuina ja alas hiljaisempina kuukausina — ei kiinteitä minimejä.
Valinnainen liinavaatevuokraus — ei omaa varastoa tai pääomaa kiinni tekstiileissä.
Nimetty palvelupäällikkö, tavoitettavissa noin 2 tunnissa.
Läpinäkyvä hinnoittelu ilman piilokuluja.
Palvelu käyntiin noin 2 arkipäivässä sopimuksen allekirjoituksesta.',
 'We scale up for peak season and down in quieter months — no fixed minimums.
Optional linen rental — no inventory or capital tied up in textiles.
A named account manager, reachable in about 2 hours.
Transparent pricing, no hidden fees.
Up and running roughly 2 business days after signing.'),
('hatapesut',
 'Nouto järjestetään yleensä 1-2 arkipäivässä yhteydenotosta.
Tarjous 12 tunnin sisällä.
Suurin osa vahinkoeristä on valmis 1-2 viikossa.
Teollinen kapasiteetti vesi-, palo- ja savuvahinkotekstiileille.
Teemme suoraa yhteistyötä vakuutusyhtiöiden ja saneerausliikkeiden kanssa.',
 'Pickup is typically arranged within 1-2 business days of contact.
Quote within 12 hours.
Most damage batches are ready in 1-2 weeks.
Industrial capacity for water, fire, and smoke damage textiles.
We work directly with insurers and restoration companies.'),
('tyoasut',
 'Nimetty palvelupäällikkö koko sopimuksen ajan.
Joustava nouto- ja toimitusaikataulu teidän tarpeisiinne.
Volyymipohjainen hinnoittelu.
16 vuoden kokemus alalta.',
 'A named account manager for the whole contract.
Flexible pickup and delivery scheduling for your needs.
Volume-based pricing.
16 years of industry experience.'),
('vuokratekstiilit',
 'Nimetty palvelupäällikkö koko sopimuksen ajan.
Joustava nouto- ja toimitusaikataulu teidän tarpeisiinne.
Volyymipohjainen hinnoittelu.
16 vuoden kokemus alalta.',
 'A named account manager for the whole contract.
Flexible pickup and delivery scheduling for your needs.
Volume-based pricing.
16 years of industry experience.'),
('muu',
 'Nimetty palvelupäällikkö koko sopimuksen ajan.
Joustava nouto- ja toimitusaikataulu teidän tarpeisiinne.
Volyymipohjainen hinnoittelu.
16 vuoden kokemus alalta.',
 'A named account manager for the whole contract.
Flexible pickup and delivery scheduling for your needs.
Volume-based pricing.
16 years of industry experience.');
