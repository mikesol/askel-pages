INSERT INTO leads (stage, tag, company, ytunnus, contact, title, phone, email, deal, contact_date, next_contact) VALUES
('liidi','UUSI asiakas','Hotelli Kauniala Oy','1234567-8','Juhani Virtanen','Toimitusjohtaja','+358 40 123 4567','juhani.virtanen@kauniala.fi',18000,'','2026-08-20'),
('liidi','UUSI asiakas','Tampereen Urheilukeskus Oy','2345678-9','Minna Korhonen','Hankintapäällikkö','+358 44 234 5678','minna.korhonen@urheilukeskus.fi',24000,'','2026-08-22'),
('liidi','UUSI asiakas','Rakennus Leinonen Oy','3456789-0','Pekka Leinonen','Toimitusjohtaja','+358 50 345 6789','pekka@rakennusleinonen.fi',9600,'','2026-08-18'),
('kartoitus','UUSI asiakas','Pelastuslaitos Pirkanmaa','7890123-4','Ari Heikkinen','Hankintapäällikkö','+358 50 789 0123','ari.heikkinen@pelastuslaitos.fi',36000,'2026-08-07','2026-08-25'),
('kartoitus','VANHA asiakas','Koulutuspalvelut Ylöjärvi','8901234-5','Seija Lähteenmäki','Palvelupäällikkö','+358 41 890 1234','seija.lahteenmaki@kouluylojärvi.fi',8400,'2026-08-01','2026-08-20'),
('tarjous','UUSI asiakas','Siivouspalvelu Puhtola Oy','9012345-6','Risto Puhtola','Toimitusjohtaja','+358 40 901 2345','risto@puhtola.fi',15600,'2026-08-05','2026-08-18'),
('tarjous','VANHA asiakas','Majoituspalvelut Näsijärvi Oy','0123456-7','Leena Järvinen','Kiinteistöpäällikkö','+358 44 012 3456','leena.jarvinen@nasijärvi.fi',21600,'2026-08-07','2026-08-20'),
('neuvottelu','UUSI asiakas','Pirkanmaan Hyvinvointipalvelut Oy','2341098-7','Olli Hämäläinen','Talouspäällikkö','+358 40 234 5671','olli.hamalainen@phvp.fi',48000,'2026-08-01','2026-08-15'),
('neuvottelu','VANHA asiakas','Hotelli Torni Tampere Oy','3452109-8','Maria Nieminen','Hankintapäällikkö','+358 44 345 6782','maria.nieminen@hotelltorni.fi',30000,'2026-08-04','2026-08-20'),
('kayttoonotto','VANHA asiakas','Tampereen Ammattiopisto TAO','5674321-0','Päivi Kuusisto','Hankintapäällikkö','+358 40 567 8904','paivi.kuusisto@tao.fi',16800,'2026-07-28','2026-09-01'),
('kayttoonotto','VANHA asiakas','Kiinteistöpalvelut Rajala Oy','6785432-1','Juha Rajala','Toimitusjohtaja','+358 44 678 9015','juha.rajala@rajalapalvelut.fi',13200,'2026-08-01','2026-08-25');

INSERT INTO lead_logs (lead_id, date, text) VALUES
(1,'2026-08-01','Löydetty verkosta, ei kontaktoitu vielä. Hotelli noin 50 huonetta.'),
(2,'2026-07-28','Potentiaalinen asiakas urheilutekstiileille. Suositeltu verkoston kautta.'),
(4,'2026-07-28','Julkinen sektori, vaatii tarjouspyyntömenettelyn. Suuri potentiaali.'),
(6,'2026-08-05','Tarjous lähetetty 5.8. Erittäin kiinnostunut.'),
(8,'2026-08-01','Neuvottelu hinnasta käynnissä. Suurin potentiaaliasiakas tällä hetkellä.'),
(9,'2026-08-04','Neuvotellaan hinnasta, kilpailija myös mukana. Päätetään viikolla 34.'),
(10,'2026-07-28','Sopimus allekirjoitettu 28.7. Aloitetaan syyskuussa.'),
(11,'2026-08-01','Onboarding käynnissä. Ensimmäinen nouto sovittu 19.8.');

INSERT INTO customers (company, ytunnus, industry, contact, title, phone, email, pricing, created_date, notes) VALUES
('Tampereen Ammattiopisto TAO','5674321-0','Koulutus','Päivi Kuusisto','Hankintapäällikkö','+358 40 567 8904','paivi.kuusisto@tao.fi','Standardi 3x/kk — 1 400 €/kk','2025-09-01','Sopimus 3v, uusittu 2025-09. Maksuaika 21 pv.'),
('Kiinteistöpalvelut Rajala Oy','6785432-1','Kiinteistöpalvelut','Juha Rajala','Toimitusjohtaja','+358 44 678 9015','juha.rajala@rajalapalvelut.fi','Perus 2x/kk — 550 €/kk','2022-03-15','Pitkäaikainen asiakas vuodesta 2022. Maksuaika 30 pv.'),
('Hotelli Harmonia Oy','8907654-3','Majoituspalvelut','Sanna Harmala','Hankintapäällikkö','+358 40 890 1237','sanna@hotelliharmonia.fi','Premium 5x/vko — 3 200 €/kk','2024-01-10','VIP-asiakas. Laskutus kuukausittain etukäteen.'),
('Päiväkoti Aurinkoinen','9018765-4','Koulutus','Maija Taipale','Johtaja','+358 44 901 2348','maija@paivakotiaurinkoinen.fi','Perus 1x/vko — 620 €/kk','2023-08-20','Kunta-asiakas. Maksuaika 14 pv.'),
('Siivouspalvelu Puhtola Oy','9012345-6','Siivouspalvelut','Risto Puhtola','Toimitusjohtaja','+358 40 901 2345','risto@puhtola.fi','Yritys 4x/kk — 960 €/kk','2026-03-01','Sopimus 1v, alkaen 2026-03. Työvaatteet ja moppipyykit.');
