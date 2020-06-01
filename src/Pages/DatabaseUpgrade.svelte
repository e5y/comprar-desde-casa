<script>
  import { onMount } from "svelte";
  import { db } from "../stores.js";

  const users = [
    [
      "1511dc2d94a21566002d348148b46f7e",
      "nutrega@gmail.com",
      "Arturo Scagliotti"
    ],
    [
      "259fea101ef28b9da75d52d4db1c9ab9",
      "silvinaramos2013@gmail.com",
      "Ramos María Silvina"
    ],
    [
      "4d5173fa61033056188c285ca73b7885",
      "cinmorate2015@gmail.com",
      "Cintia morate"
    ],
    [
      "a04aa22a08f44d975161a234868c279f",
      "jcristino@elinstaladorsa.com.ar",
      "José Cristino"
    ],
    [
      "9a3642fc71d41a3071ed3430d7988503",
      "consultasnuestroclub@gmail.com",
      "Sushai furquez"
    ],
    [
      "3ec108760c234e8d047a254cd892a3e9",
      "cienxcientolomo@hotmail.com",
      "100x100lomo"
    ],
    [
      "10c085fba4253ab9409125227c01746d",
      "fyuquich@gmail.com",
      "Flavia Yuquich"
    ],
    [
      "d72d34de44594be03bc3f8a57baf5e37",
      "hola@abuenbosque.com.ar",
      "Julieta Gaido"
    ],
    [
      "0c350b9b967c56f14a054cf1b76b0aa0",
      "Lililianamegazzini@gmail.com",
      "Megazzini Liliana"
    ],
    [
      "417678c80d0d187074432fbf2bd7039a",
      "toninorestobar@gmail.com",
      "Fernández Laura"
    ],
    ["4d29c68b4dcb95483cc7163c0fcd314b", "kioscobarcactus@gmail.com", "Mario"],
    [
      "52e138a394997d1415fa10e7dec184bc",
      "viviana.iriarte68@gmail.com",
      "Viviana"
    ],
    [
      "97d66e6e41af9ba45ad0edd060c35ad9",
      "stellamazzeo@hotmail.com",
      "Stella Maris Mazzeo"
    ],
    [
      "02b5d39f570128e88259c683fcff3b6d",
      "veterinaria_cazorla@yahoo.com.ar",
      "Gonzalo cazorla"
    ],
    ["69bf30b2385da2ad91b1446adb468d25", "fliabrane@hotmail.com", "Viviana"],
    ["b4249efc460702bd998fc942ac77a549", "nahuelpaez1987@gmail.com", "Nahuel"],
    [
      "ed0f74742c979829a1e5726f180793dd",
      "fersanchez0736@gmail.com",
      "Fernanda Sanchez"
    ],
    [
      "dbdcee4c69b20490630d78f328f67082",
      "solitaruizlobo74@gmail.com",
      "Soledad Ruiz"
    ],
    [
      "763aa9075b342385a4ebe57638e54048",
      "gvazquezcuestas@gmail.com",
      "Gastón Vázquez Cuestas"
    ],
    [
      "8a0d2e868c7d730e9f2ca3f12f0350a9",
      "vitalstore.sanjuan@gmail.com",
      "Guenem Yasmin Alejandra"
    ],
    ["96b92a568b62a340702135c71a622d40", "info@mocona.com.ar", "Mery Lunge"],
    [
      "cbc20d9509526fd850e71f5e73fe20d6",
      "solitaruizlobo74@gmail.com",
      "Soledad Ruiz"
    ],
    [
      "25f72f6b310f08ac50f0900e955f9423",
      "robertoivansanchez@gmail.com",
      "Ivan"
    ],
    [
      "58dab4f81cde923aa0590c9f2fed9138",
      "valerysmar@gmail.com",
      "Martínez Valeria"
    ],
    [
      "8fcbce61830f001d027145edd03f48e4",
      "agusgacitua@gmail.com",
      "Agustin Gacitua"
    ],
    [
      "9e081359500e1d55302afacfb7d9224f",
      "Profacorsas@gmail.com",
      "Javier Altamirano"
    ],
    [
      "3e0e0cde7a1405c0756356349ffa6b7b",
      "tienda@solucionesgraficas.com.ar",
      "Gastón Ferrero"
    ],
    [
      "e48d359e749e6cbaa3c6bd2926482f3e",
      "toninorestobar@gmail.com",
      "Fernández laura"
    ],
    [
      "111e01733b9e0934a4d253ddfb51114e",
      "centenolozada@gmail.com",
      "Fernando Centeno Lozada"
    ],
    [
      "23b6b0d776e066838f47918b154d935b",
      "conceptolar@gmail.com",
      "Maria Fabiana Peña"
    ],
    [
      "91780556607c5f6b5a2c41247a174b7a",
      "carvc32@hotmail.com",
      "CARLOS ENRIQUE VILLEGAS CABRERA"
    ],
    [
      "ea3f1aa821e910529d610ca0679b168a",
      "fedeoyola@hotmail.com",
      "Federico oyola"
    ],
    [
      "d2a7f60d526f27a9a2ebba44e8b35c35",
      "fede.multiphone@gmail.com",
      "Federico Castellanos"
    ],
    [
      "c816948d8aa91b0606dd3355229274fd",
      "marianogabrielgomez04@gmail.com",
      "Mariano Gómez"
    ],
    [
      "e63286d29329885661e029c4e78e2acc",
      "pescarburo@gmail.com",
      "Paola Guzmán"
    ],
    [
      "b343642b224c93f15124339357ac590c",
      "jonathansbustamante990@gmail.com",
      "Jonathan bustamante"
    ],
    [
      "3b4aa1fe284037e02e37b6539eff132f",
      "ventas2@miguelangelpapa.com.ar",
      "Miguel Ángel Papa"
    ],
    ["0cd19c381b7f9f0b8857507d1ce7892b", "gicebreyro@gmail.com", "Gisela"],
    [
      "5e68d9d9236964dd584d289a7e4235a3",
      "nutrega@gmail.com",
      "Arturo Scagliotti"
    ],
    [
      "2d07d7c4a618358f8807d099982c036e",
      "cloveropadeninos@gmail.com",
      "Mariana Hermida"
    ],
    [
      "3a1aebf39ee135965d512d940f4f8c44",
      "matiasjgarciav@gmail.com",
      "Matias Jose"
    ],
    [
      "b85702d0281471ce37230eab17121642",
      "infoalamanocongelados@gmail.com",
      "facundo bas"
    ],
    [
      "40a15082045263243648183ed65c1c17",
      "gaston_hidalgo@hotmail.com",
      "GASTON HIDALGO"
    ],
    ["70bb33357e1e1fce5ac8382439854dee", "omarleyria@gmail.com", "Omar leyria"],
    [
      "c430ddf7a22fa78493659bc244e76167",
      "chelospacca@gmail.com",
      "Marcelo Soaccasassi"
    ],
    [
      "c18392bf9e6e50981a58c6722a9da271",
      "paulaanahicastillo@hotmail.com",
      "Paula"
    ],
    [
      "39ee7817a51c05da892ae55bba09879c",
      "carneshorizonte@hotmail.com",
      "Agustín"
    ],
    [
      "e5b758b126e17eb5931b5a91ea7311c9",
      "frigorificogralpaz1@outlook.com.ar",
      "Agustín"
    ],
    [
      "31fad3dd99d93700183303a9951a330f",
      "pabloserfaty@gmail.com",
      "Serfaty Pablo"
    ],
    [
      "438dd3695fea5a63005e54a6a72c6638",
      "amarelocasadebebidas@gmail.com",
      "Nicolás Mussetti"
    ],
    [
      "752447984b168ff07e21a72a567801db",
      "mlpastene@hotmail.com",
      "Martin Pastene"
    ],
    [
      "69af8115618279915d9f4b8727471bf0",
      "andaluciaregalos@gmail.com",
      "Carla Patricia Tomasino"
    ],
    [
      "f714ac3d7c20257ba649fe05d03f38dc",
      "cloveropadeninos@gmail.com",
      "Mariana Hermida"
    ],
    [
      "05363afc52e4401661a96a784278125f",
      "muminguez77@gmail.com",
      "Gabriel Domínguez"
    ],
    [
      "22114ffe52129f584089bb7669d96a58",
      "arguzialaser@hotmail.com",
      "Damián Benvenutto"
    ],
    [
      "29a26c7a407e17674015b58a6b205b0a",
      "digaretto@hotmail.com",
      "Dardo Emanuel Garetto"
    ],
    ["6fa2f6d80ce29445512e41686ff58bc2", "bazzarsrl@gmail.com", "BAZZAR SRL"],
    [
      "5e3b5e4061929b9e5afe4750488a0da1",
      "kapochon75@gmail.com",
      "Ariel Torres"
    ],
    [
      "47bbecf20c3c8d941952612575c52e15",
      "lacabanadejuan.cba@gmail.com",
      "German Pablo Cento"
    ],
    [
      "16908fd507ee45f531aac4e45f5247a1",
      "hectorivanrodriguez.at@gmail.com",
      "Hector Ivan Rodriguez"
    ],
    [
      "be3226a779439bb51ca73e21c86b7c0f",
      "chelospacca@gmail.com",
      "Marcelo Cerra"
    ],
    [
      "8612202971276b725b3d8773cbc045ca",
      "milenagervasoni@hotmail.com",
      "Milena"
    ],
    ["fca3743b2fbe21900bb68c41edd87e6e", "aylen_12@hotmail.com", "Susana"],
    [
      "20f64755a77c045b36c354c40b669ba3",
      "francopravisan@gmail.com",
      "Franco Pravisan"
    ],
    ["f519c0da1c6095653772a92e3841a4e7", "silvimoyacba@gmail.com", "Silvia"],
    [
      "96e1e11b735444dd98b1f269d500167c",
      "fla_romero@hotmail.com",
      "Flavia Romero"
    ],
    [
      "600565e27e317f528e6bee8a675f1f89",
      "gheiss@centrodelaimpresora.com.ar",
      "Heiss Griselda Monica"
    ],
    [
      "a60a0507437458c68f4369a7049701d9",
      "marianahermida.mh@gmail.com",
      "Mariana Hermida"
    ],
    [
      "06638c21538290ef51031127589e74bc",
      "elvasqito@hotmail.com",
      "ACOSTA; Carolina Gabriela"
    ],
    [
      "cfc4b0b71c6d00ac4f33742592cf886f",
      "country.clothes1@gemail.com",
      "Karina"
    ],
    [
      "ef269c466baf730f942a6f84ca7870f1",
      "sebabecerra@hotmail.com",
      "Sebastian Becerra"
    ],
    [
      "b9be8106381aa2d7a78d44059f8e3926",
      "maxiyanes.carnes@gmail.com",
      "Maxi Yanes"
    ],
    [
      "3536c21f1728386e51f3d8392c6d6e8f",
      "mariapiaparnisari@gmail.com",
      "Maria Parnisari"
    ],
    [
      "e14b7c7a420e20bf532eabf48a923185",
      "equipamientocordoba@hotmail.com",
      "Fernando C Llugdar"
    ],
    [
      "11a07c2f91604f5364598f1581188b36",
      "fflimpieza@gmail.com",
      "Petrone María Florencia"
    ],
    [
      "3888ea7567a88ce7151596431e238ca4",
      "digaretto@hotmail.com",
      "Dardo Emanuel Garetto"
    ],
    [
      "03c73e8929b1560887fa2e1b508437ee",
      "majomaza@hotmail.com",
      "María José Maza"
    ],
    [
      "4f463ff232929c758b67bc30c78367d2",
      "arturomooney@gmail.com",
      "Arturo Mooney"
    ],
    [
      "f7b223ca41fb88e58c6c6d9aa8137a4e",
      "santiagodaquino@gmail.com",
      "Santiago"
    ],
    [
      "cbeb15cf80bd0f7e7ae0a8e1e0fc06b4",
      "KEKY2003@HOTMAIL.COM",
      "Pollería y Verdulería *LA BRI*"
    ],
    [
      "d8c8af317b466f928020e50e2cfa1427",
      "imperialregalos@gmail.com",
      "viviana rivero"
    ],
    [
      "32d034f1929b18916fb345b70b113fd0",
      "entremes.catering@hotmail.com",
      "Ariel Darío Aranda"
    ],
    [
      "25959cea840e16de283f748b3da2a0e5",
      "albarracin.jorge73@gmail.com",
      "Jorge Eduardo Albarracin"
    ],
    ["4cc1ae067cfba09e26bd77fb96845fed", "jm_porta@hotmail.com", "Juan"],
    [
      "d765c4581bba32e38a543cdc231c7b5f",
      "vinotecalalik@hotmail.com",
      "Maria Paula Lalik"
    ],
    [
      "e7a0040f7f0508be585bba20fd41a27d",
      "mauriciojavier454@gmail.com",
      "Mauricio Javier Ahumada"
    ],
    ["46d90a253f416f2c88d2da9a52e88d5a", "wiston824@gmail.com", "Wiston"],
    [
      "2e5664c74f59561f40ad14fd6c2335a1",
      "marianocampos31@hotmail.com",
      "CAMPOS EMILIO MARIANO"
    ],
    [
      "a4bb60701048239236b9fedebf9d8c50",
      "marianocampos41@hotmail.com",
      "CAMPOS EMILIO MARIANO"
    ],
    [
      "6f9bf3a423cf094244436fc35c753edf",
      "graficatrejo@gmail.com",
      "María Eugenia Cordero"
    ],
    [
      "24bbd946725428db19d07e5e3b180b76",
      "matiaspolzella@gmail.com",
      "Matias Polzella"
    ],
    [
      "dd3621c0331a2bdd4622d7a83cd313ad",
      "yacoperalta@gmail.com",
      "Claudia Pajón"
    ],
    [
      "15d7c80060136bd913188607e8183006",
      "mferahumada@live.com",
      "Gustavo Ochoa"
    ],
    [
      "97b21849796766ea1b7422702c55587c",
      "ju_pa210477@hotmail.com",
      "Juan Pablo Rodriguez"
    ],
    [
      "da8ff24ba4693383a448d27bbb9b299e",
      "laurinueva@hotmail.com",
      "Laura Inés Pérez"
    ],
    [
      "3ccb32b3973c1dd1071c2954c2620468",
      "florgnr@yahoo.com",
      "Florencia Belen Ruiz"
    ],
    [
      "013dd23c864d22dea4e48def0d9b745d",
      "julianalvarez1994@hotmail.com",
      "Julian"
    ],
    ["28f48541889b6f035f5acbfce8083a92", "fgonzalo80@gmail.com", "Gonzalo"],
    [
      "a31ee7061c196ab4a692d6553bf01adf",
      "belaquintero@hotmail.com",
      "Belen quintero"
    ],
    [
      "aebb7b752467a3729db9f57bc3d5596a",
      "info@handicapdeportes.com.ar",
      "HANDICAP SA"
    ],
    [
      "aeec17dd2ef72caca3b0e3e25aad1301",
      "sebaobeid@hotmail.com",
      "sebastian obeid"
    ],
    [
      "b0f97bf09cd34c426ca5ff8cb066a580",
      "sarmientolibrerias@gmail.com",
      "PABLO F SARMIENTO"
    ],
    [
      "da1323f82eaa930f2255563df6157430",
      "equipamientocordoba@hotmail.com",
      "Fernando C Llugdar"
    ],
    [
      "4f0aa65159d25c3549900a8247df2798",
      "nicolaquintana2@hotmail.com",
      "Federico brinkmann"
    ],
    [
      "a1e824a894238e22905c54fbe47c07cc",
      "hollywoodalgodiferente@yahoo.com.ar",
      "Estela Viscarra"
    ],
    ["ac7f9b1a4ccc9c7021d1329e7c4598ed", "julifili@hotmail.com", "Alta Gama"],
    [
      "0c651f6734eb9f1521fcee3126427d1d",
      "florvullocenteno@gmail.com",
      "Florencia"
    ],
    [
      "500054578045904543a8f5c9c2468e6e",
      "ochretejeda@hotmail.com",
      "Emmanuel Silvetti"
    ],
    [
      "b64da61a6dc643533d72743ada2714fc",
      "miloregarcia79@gmail.com",
      "Lorena García"
    ],
    [
      "1f5610c3155ca2416ac79edf49428d9a",
      "barquitodepapel2006@gmail.com",
      "Liliana Correa"
    ],
    [
      "32cc8a0f2e2181c109ff8a0d3b2f6611",
      "manunceballos@hotmail.com",
      "Emanuel ceballos"
    ],
    [
      "a0d24c5f48ac73b465eb260445fd6352",
      "flormanzano@hotmail.com",
      "Florencia"
    ],
    [
      "cee19c0639489b32a79313a0b50413e0",
      "naiaradbc@gmail.com",
      "Naiara de Brito e Cunha"
    ],
    [
      "e488c97958cc0f445375a7c04adf7469",
      "andreaslusar@live.com.ar",
      "Josefina Andrea Slusar"
    ],
    [
      "71357f69536ea6cd8ab95e5304ca5f0a",
      "full.sport.cba@gmail.com",
      "Carlos Simón"
    ],
    [
      "4a12ab750f2709020ec15eccb33631df",
      "cielo.wurch@gmail.com",
      "Gisella Bellagamba"
    ],
    [
      "8d29892b99c329e755c98b5269b218e9",
      "vitalstore.ituzaingo@gmail.com",
      "Guenem Karina Alexandra"
    ],
    [
      "41d09ec244685f1a38f0eed11afea32e",
      "ANDREAMIRANDA110@HOTMAIL.COM",
      "ANDRES EZEQUIEL ACEVEDO"
    ],
    [
      "f639b47b7b9e63c388649468e6fa7f48",
      "libreriaplatino@gmail.com",
      "Ornela Mainero"
    ],
    [
      "2ae2144d09a123612a32c882e913867e",
      "cinmorate2015@gmail.com",
      "Cintia morate"
    ],
    [
      "cf06a14564ed5a653b6229bd957a29e9",
      "pabloaratti@gmail.com",
      "Pablo Ratti"
    ],
    ["894789609759977289cf81dde9673eb8", "terrabussa@gmail.com", "Mario"],
    [
      "d59da88c61f663fd1061256205f25a51",
      "veronica.cardella@gmail.com",
      "Verónica Cardella"
    ],
    [
      "01e5e1597ab5571a7c96276bf5144bc6",
      "metegolespesados@gmail.com",
      "Manuel Fillol"
    ],
    [
      "ecd4fb751ab62ff2719867c1b0e76f26",
      "fede_ortiz11@hotmail.com",
      "Federico ortiz"
    ],
    [
      "d460d00404d11c1c1b4fcdd1acf84eff",
      "dinalents@dinalents.com.ar",
      "Eduardo Guini"
    ],
    [
      "f8d1d5cb154228e0a4709e49794b8f83",
      "holamariamembrillo@gmail.com",
      "Teli Turturro"
    ],
    [
      "ed02523d951166e337f6051642898540",
      "carlosmbesso@gmail.com",
      "BESSO CARLOS MIGUEL"
    ],
    [
      "f30ec0214d2b3bdf7762bbdd3e7852b4",
      "fj.bromatologia@gmail.com",
      "Rodríguez Ana Valentina"
    ],
    [
      "232537b7a4b077b23a0c415c52207ac4",
      "pablocobo35@gmail.com",
      "Cobo Gordillo Pablo"
    ],
    [
      "8077e072a60d3b3a3413c8f17b564636",
      "infotec.serviciotecnicopc@gmail.com",
      "Luciano y Maico"
    ],
    [
      "cad8bcda73636a873abdd701cb0b8284",
      "melifushimi@gmail.com",
      "Melisa fushimi"
    ],
    [
      "52735b0e62b291f364dc275efac669c6",
      "lic.carolinaalegret@gmail.com",
      "Carolina alegret"
    ],
    [
      "6ab333810cc51abc7631ca5ceb5e3265",
      "contacto@oprintcba.com.ar",
      "Paulina"
    ],
    [
      "31ebc60916b27af2978f744697ad6d0a",
      "danielmonoboscatto@gmail.com",
      "Marcos León lucero"
    ],
    [
      "2909bd9b3646535f41e86d8c46e7067b",
      "danielmonoboscatto@gmail.com",
      "Daniel boscatto"
    ],
    [
      "c1b2a967a79ea00401c7d89b0d470962",
      "chimbojorge@hotmail.com",
      "Jorge Chimbo"
    ],
    [
      "5e03156744c77c868312990fe27a28bb",
      "sofiadigiusto@hotmail.com",
      "Protección Facial"
    ],
    [
      "cbd10ff20af48f29514dd726dc1e7495",
      "panificacionessancayetano@gmail.com",
      "Jorge Negri"
    ],
    [
      "aa3b6742584344cc3d9636215c0a0fc8",
      "masterauxsoftware@hotmail.com",
      "NORBERTO BAYARRI"
    ],
    [
      "4b9c2aad5192721b0e117d24377c9bed",
      "alfonsina.martini@hotmail.com",
      "Funes Joaquin Federico"
    ],
    [
      "fbef3c715ef2418e63e0d401262222ef",
      "soporte@grupoeon.com.ar",
      "Desconocido"
    ],
    [
      "5ca4004733ee1dd9918448bd0954a72d",
      "info@botellonbebidas.com.ar",
      "Juan Teicher"
    ],
    [
      "0ee372923c6519ff0de01baecf105771",
      "ayuine@hotmail.com",
      "Florencia chacon"
    ],
    [
      "c4d230cca387776560cc1f0904060f9f",
      "margaritadistribuidora740@gmail.com",
      "Giuliana Fajardo"
    ],
    [
      "2d8046f09c16156375e227c25c6f7623",
      "info@chiagoodfood.com",
      "JUAN PABLO ÑAÑEZ"
    ],
    [
      "f64ec4cd38958a8c33e9495fc200214c",
      "delcentropintureriaslc@gmail.com",
      "Cimo Carlos"
    ],
    [
      "4bd56eb303218af79cee105cb2dc49f5",
      "francomilani20@gmail.com",
      "FRANCO MILANI"
    ],
    [
      "2401107442e24cf52824a814f956932a",
      "panaderiaromanos@hotmail.com",
      "Rodrigo salinas"
    ],
    [
      "ff7d41124bbf6dca737d5d6510f048d3",
      "jagustincarranza@gmail.com",
      "Agustin Carranza"
    ],
    [
      "59c2a4322ed8512529ee16f4bb744113",
      "cesarveron_2014@hotmail.com",
      "Cesar Veron"
    ],
    [
      "5994f0ce5ed0076b485a8b8998359443",
      "flormanzano@hotmail.com",
      "Florencia"
    ],
    [
      "779a4f591d8f843580c36615c75d39ac",
      "rociolepre@hotmail.com",
      "Rocío lepre"
    ],
    ["423fd55c99092633a3df62b8e5cf42ba", "lauraplenazzio@gmail.com", "Laura"],
    ["7595301f10217b3392b447d7ebe29d5a", "lato3374@gmail.com", "Lautaro"],
    [
      "a76bc4d7893089ce5f12870abe3690a6",
      "marianocampos32@hotmail.com",
      "Mariano Campos"
    ],
    [
      "7413d6a0074a60a498282b24787a3bfb",
      "sebas39cheff@hotmail.com",
      "Sebastianlavayen_privatechef"
    ],
    [
      "9acc7cbe06db1db8101d6f4dc38f75ea",
      "bettinadavalos@gmail.com",
      "Bettina Dávalos"
    ],
    ["d2a174930d98250922e72746bd984dee", "rquiroga12@hotmail.com", "Ricardo"],
    [
      "5d441c608b406ab13673c6b0426a2531",
      "Espaciogourmet@hotmail.com.ar",
      "Franco Agustín"
    ],
    [
      "d5ab20e82b806d1257e3e4f2a0fb13d3",
      "tilintobal@gmail.com",
      "Martin tobal"
    ],
    [
      "502eadf205f67156839e313a08a83039",
      "pablogusolfino@gmail.com",
      "Pablo Gusolfino"
    ],
    [
      "49ad27a28b8a3476730ace4f3be96e3a",
      "facu.tachini@gmail.com",
      "Facundo tachini"
    ],
    [
      "d746bf986f7d3e49861f750d5087640a",
      "valentindamore@gmail.com",
      "VALENTIN MA D AMORE"
    ],
    [
      "10ac6b9e4a3398c0795cc61b8f91071c",
      "julietakerz@gmail.com",
      "Julieta Kerz"
    ],
    [
      "60190e38366366f260672ca4b9c70062",
      "guidofarias1992@hotmail.com",
      "Guido Farias"
    ],
    [
      "9d11d91c0d75209d42e2344344a5a6fd",
      "cisled.computacion@gmail.com",
      "Cesar Cisneros"
    ],
    [
      "063d3cf2449a183f778b608452f80727",
      "federicoocantos@hotmail.com.ar",
      "Federico ocantos"
    ],
    [
      "0b3de6335c91715938875c797da11612",
      "clau-gallardoo@hotmail.com",
      "Natalia Herrero"
    ],
    [
      "a5c9a0cc6acd731a7c81b913b2a77e33",
      "solitaruizlobo74@gmail.com",
      "Soledad Ruiz"
    ],
    [
      "d16a243a02b25ad64e4fb1afb819672e",
      "venezia.lasflores@gmail.com",
      "Cristian Borioni"
    ],
    ["9fb818e06a64286c3729639721881d91", "davcountry@outlook.com", "Diego"],
    [
      "dbaee23f82035b643b5f2f7ebe782398",
      "burbujasjugueteria@gmail.com",
      "Christian Ralph"
    ],
    [
      "1e31f7fe775a075e7ee9477dd3ed6c61",
      "carignanonatalia@hotmail.com",
      "Natalia Carignano"
    ],
    [
      "6042dd1ba616223d2771b0d7a8d68b97",
      "vicioteca.edp@gmail.com",
      "Ignacio brito"
    ],
    [
      "48f8fe157cd36aa8064ec37b32d09469",
      "ferbernal2017@gmail.com",
      "Fernando Bernal"
    ],
    [
      "c64b033e3796359c144ec192ef707302",
      "ferreteriaopen@hotmail.com",
      "Matias"
    ],
    ["9463632823ac13f267f7dc21358a3b59", "terrabussa@gmail.com", "Mario"],
    ["9fd043517b345ef1291b86b38b6d0ef5", "mcpando23@gmail.com", "Constanza"],
    [
      "27a0ee57997c8c0812408ff1cb889dea",
      "guga16196@gmail.com",
      "Agustina Benitez"
    ],
    [
      "f5b16fd54c9582a740840f74286070fe",
      "solitaruizlobo74@gmail.com",
      "Soledad Ruiz"
    ],
    [
      "413f211172184fbb7a7ce71d557c1454",
      "alejandro.si6fueran9@gmail.com",
      "Daniel Misa"
    ],
    [
      "faa72ffc51f153071de6af7466a23845",
      "joiacor@yahoo.com.ar",
      "Silvana Okmos"
    ],
    ["832270676076024240b94f642ebf0fe8", "pocho@munchen.com.ar", "Pocho Fueyo"],
    ["a8b000850ce03a6453a2e89c2b5274f6", "adrmonte@gmail.com", "Adrián Monte"],
    [
      "296a8dd86290853f1a6ee6d1474f176e",
      "ferparedes303@gmail.com",
      "Emanuel González"
    ],
    [
      "d27a46746f3e0954256ee98b038110d4",
      "darioeganim@gmail.com",
      "Dario Ganim"
    ],
    [
      "61f7c1f8688273319b9b8243cdbd4cce",
      "almacenferretero10@gmail.com",
      "Rossini Maria Julieta"
    ],
    [
      "d0a26faf9d29a0da3ec5bba994b52e17",
      "andreossi93@hotmail.com",
      "Maximiliano andreozzi"
    ],
    ["4487548b8bcb3a414e717efde60e253b", "Keky2003@hotmail.com", "Nanci Sayas"],
    ["28db24fa9c9f431f5e79ea331de38201", "macrestaurante@gmail.com", "Carmen"],
    [
      "4d9d070c8be340b69066c8ae777d2d0b",
      "juancabutto@gmail.com",
      "Juan Cabutto"
    ],
    [
      "5b558a5220116b08a6d0b1cd0a9c0cbc",
      "nachotrigueros@hotmail.com",
      "Fernando Ignacio Trigueros"
    ],
    [
      "b8af9df627c55e625087efac0235a4b3",
      "admperla265@hotmail.com",
      "Juan Cruz"
    ],
    [
      "68ff92c8965754c49cf3a68293709071",
      "poniiocomercial@gmail.com",
      "Juan Pablo Las Heras"
    ],
    [
      "a84e799e19a00d34a02bb5568a103ae8",
      "yaminoeurrich@gmail.com",
      "Yamila Noelia Urrichi"
    ],
    [
      "a36e5ff7794168845f10343a6eb35715",
      "veterinariaonline2015@gmail.com",
      "Debernardo Julieta"
    ],
    [
      "b536412391915ad764a716d691e1a252",
      "leo_pinto438@hotmail.com",
      "Leonardo Pinto"
    ],
    [
      "ed8ab3127149714e4d476bfc935d2199",
      "nicolaquintana2@hotmail.com",
      "santiago nicola"
    ],
    [
      "3f8a9a078a6a33dd721198af21fe8e3b",
      "info@pccore.com.ar",
      "Guillermo Juaneda"
    ],
    [
      "c2557112752207476b85369e0acb9f0c",
      "solitaruizlobo74@gmail.com",
      "Soledad Ruiz"
    ],
    [
      "b7aaf3b32e23698165d867d8e33c4b57",
      "ganchosargentina@hotmail.com",
      "Joaquin Fillol"
    ],
    [
      "1d5a31fc13e0a3e41fe843a8d0fd4acc",
      "agusmartinezmanzur@gmqil.com",
      "Agustín Martínez"
    ],
    [
      "06585f275e4030357fdecf5c48a307d4",
      "sportkinesiocordoba@gmail.com",
      "Guillermo Arias"
    ],
    [
      "bea5e27a14b84dc48010e195c5488213",
      "jesicarpinellopd@gmail.com",
      "Jesica carpinello"
    ],
    [
      "4622797f9fb5423306b883a0c8c28734",
      "cecco01@hotmail.com",
      "Diego Cecconello"
    ],
    ["3a57762b4e16040c0c745aaeaf903007", "gicebreyro@gmail.com", "Gisela"],
    [
      "2251655e1fff454052ed5ee726e33fe8",
      "aruedaindumentaria@hotmail.com",
      "Dana"
    ],
    [
      "d220a94d44ec8af452c1782e4d7f2658",
      "marcoshaedo166@hotmail.com",
      "Marcos Haedo"
    ],
    [
      "69c2d466646f69b05e8a5ca4ccb4784f",
      "adrianarosenblum@hotmail.com",
      "Adriana Rosenblum"
    ],
    ["3d4cd0da694a8376319c6b7476411f25", "gicebreyro@gmail.com", "Gisela"],
    [
      "b670200a525aa0e13528ebb633699aaa",
      "libremax.libreria@gmail.com",
      "Maria Mondino"
    ],
    [
      "4223bdcb248e65808f8e93644c9c6262",
      "ceciliab.mazzoni@gmail.com",
      "Cecilia"
    ],
    [
      "749374ba0287242f9fe3119e5e7f6505",
      "administrador@aselectricidad.com.ar",
      "AS Materiales Eléctricos"
    ],
    [
      "59bead414e2634c61cde62427e686d0c",
      "solitaruizlobo74@gmail.com",
      "Soledad Ruiz"
    ],
    [
      "16a208e21afc9716481a534963669df7",
      "carlospizarro288@gmail.com",
      "CARLOS PIZARRO"
    ],
    [
      "85a54ae30c371bc05cf20ea9974f06ef",
      "amnadaya@gmail.com",
      "Adriana Nadaya"
    ],
    [
      "dd9168fb7491a221624dea08044801cf",
      "danalbrt2210@gmail.com",
      "Daniel Mercado"
    ],
    [
      "04c8c14a75d067200c42b86a62982f71",
      "laferreferreteriacba@gmail.com",
      "Claudio Marquez"
    ],
    [
      "4f1dcecf1410132e4ae475ba59a23dbc",
      "alta_tech@hotamil.com",
      "Marcela Fajardo"
    ],
    [
      "b3b2dcd15b63754856de406e5ba9608a",
      "autocenter.rivera@gmail.com",
      "Marcelo Vega"
    ],
    [
      "3e078d754aa5876b60601f5f8a809917",
      "jagustincarranza@gmail.com",
      "Agustin"
    ],
    [
      "99ff3c033b3ba5b8090b40f2306e1791",
      "contadormanero@gmail.com",
      "Matias Manero"
    ],
    [
      "2a7d880262cd489a3b08f98097ec22e8",
      "walter_tomasino@hotmail.com",
      "Wálter Tomasino"
    ],
    [
      "757492ada33821f3661c59ae52185194",
      "dante3101ruben@gmail.com",
      "Dante Frontera"
    ],
    [
      "bb2abda065b094f29b8d5e2c341d0e0e",
      "ferre@ferreteriadelhogar.com.ar",
      "Juan manuel"
    ],
    [
      "f953f8788972650519ac61c3978f1934",
      "soporte@grupoeon.com.ar",
      "Desconocido"
    ],
    [
      "219ce0f36e382f5e2e8e1479adf02bf4",
      "marcoshaedo166@hotmail.com",
      "Icfen Srl"
    ],
    [
      "f6b44d6f02a1385a5ddd0781edfc4b63",
      "farmaciasalomon@hotmail.com",
      "salomon maria"
    ],
    [
      "66fa029a74f152303f2b29c8e969073a",
      "lasrecetasdeolivia@hotmail.com",
      "GASTON HIDALGO"
    ],
    [
      "b8ffa9f303a71a6f5ce3f45f1a2264ea",
      "cingolani1@hotmail.com",
      "Matias cingolani"
    ],
    [
      "e03b4b412db094b18f13a535698f75fe",
      "lucianodiegovillarroel@gmail.com",
      "Luciano villarroel"
    ],
    ["8fe8e060591f205c4f04b1b38b6a2aa9", "mabbicomplements@gmail.com", "Mabbi"],
    [
      "6362c3d55d808bac7f3f8df269ee26f8",
      "saboresyvinos@hotmail.com",
      "Javier Corigliano"
    ],
    [
      "c66f0f73248c8afe09ce49133be0a33c",
      "todopiscinascba@gmail.com",
      "TAMARA QUINTEROS"
    ],
    [
      "4962302a91762bf218a52786075b3a8f",
      "eloidea81@hotmail.com",
      "Eloísa López Montamat"
    ],
    [
      "24c5419d5c742d9449aef158a20064c0",
      "vissia.cba@gmail.com",
      "Local de indumentaria femenina"
    ],
    [
      "d2a8f728349716250d9ec9197a9e421b",
      "disego@live.com.ar",
      "Mendoza Leonor Maria"
    ],
    [
      "913421bb40a5974260bb07b7b35665cb",
      "velez_valeria@hotmail.com",
      "Valeria Velez"
    ],
    ["268f1e3b09d252e24d644f54614c7478", "gicebreyro@gmail.com", "Gisela"],
    ["724bb8d03c4520d0174e1a6ef3ec630e", "7onzas@gmail.com", "Dante Enriquez"],
    [
      "e01350747c6d5762704fda79177a39c1",
      "ochretejeda@hotmail.com",
      "Lucio Turchetto"
    ],
    ["1afb43a8344482335ff0e8ec99a3a663", "ndespertar@yahoo.com.ar", "Laureano"],
    [
      "eca1fa5615c50243516254b8205a05c9",
      "imprentaoffimax@gmail.com",
      "JORGE MILES"
    ],
    [
      "c76510529d5aa3304957f37dbc7a872a",
      "pupiromero@gmail.com",
      "Silvina Romero"
    ],
    [
      "6bdb71f98eeb7264039d1ef0a1d962c9",
      "flormanzano@hotmail.com",
      "Florencia"
    ],
    [
      "878472c881d228e470c082dd99286ffa",
      "masterauxsoftware@hotmail.com",
      "NORBERTO BAYARRI"
    ],
    [
      "418f3044278e90c7607e3c53ebb12a3e",
      "sabrosonburger@gmail.com",
      "Esteban Velasquez"
    ],
    [
      "e2fbc4bf30e58cb23c68f63ae1a0116e",
      "tesoreria@panaderiadelpilar.com.ar",
      "Paula Rodriguez"
    ],
    ["25621be280c432b72c8867a21268512a", "fergoro23@gmail.com", "Fernando."],
    [
      "07a076944b1c248f94f8a4891f1001b2",
      "eventos@eventoslaquerencia.com.ar",
      "Raúl Emiliano Fader"
    ],
    [
      "2dd5e1945a211e011ceda6f5985a0e84",
      "gourmetsamdwichscba@gmail.com",
      "Carolina Bazan"
    ],
    [
      "f29b33e244efa3b0a5e6b434238857ad",
      "fiorelamartinez6@gmail.com",
      "Fiorela Martínez"
    ],
    [
      "1ea75d8e25b076303ad4355427599512",
      "silvinaramos2013@gmail.com",
      "Ramos María Silvina"
    ],
    ["3a3210cf4830371017b5fa8b8b094553", "jlistello@hotmail.com", "Jorge"],
    [
      "24ba15dd76fa3e446762f37a59e4a2ee",
      "pradonaty27@gmail.com",
      "Natalia Prado"
    ],
    [
      "ec92cf4595586d29120e3a7c4d5f9b6a",
      "nicovitullo@live.com.ar",
      "Vitullo Nicolas"
    ],
    [
      "2406c3762c802b153ce2039894c855a6",
      "solitaruizlobo74@gmail.com",
      "Soledad Ruiz"
    ],
    ["5e332dd95663085808acf86e5ef7689c", "ximedol@gmail.com", "Ximena"],
    [
      "4e42eb4658037a8c91abbdf6f1c87da1",
      "zhenredes@gmail.com",
      "Facundo Bustos"
    ],
    [
      "c09d4a374c805ec271d18f5c63542fc5",
      "maxiarreguez11@gmail.com",
      "Maximiliano arreguez"
    ],
    [
      "633788d09f1f46e06453ceb6366541b0",
      "daniochoaaa12@gmail.com",
      "Daniela ochoa"
    ],
    [
      "f0be1360655d2fc21e41417b6e1b2918",
      "jenetecomprendpas@gmail.com",
      "Joaquin Aguirre"
    ],
    [
      "bdfcc6864d884a7698610723e0728ee7",
      "ganchosargentina@hotmail.com",
      "Fillol Joaquin Ernesto"
    ],
    ["1a0bc9c29add4cf44e4ba508d4af785c", "omarleyria@gmail.com", "Omar Leyria"],
    [
      "2c90c78419dc5c3b2f4b3f573cc9274b",
      "walter_tomasino@hotmail.com",
      "Wálter Tomasino"
    ],
    [
      "921a920696a45e8b1e660c140f0a70a4",
      "dige78@hotmail.com",
      "Diego gerhardt"
    ],
    [
      "817f81e95a0929c9884f8f0d9392800e",
      "albarracin.jorge73@gmail.com",
      "Jorge Eduardo Albarracin"
    ],
    [
      "ae7515ef38752c7141d35c5aaac77441",
      "ventas.imperiumaccesorios@gmail.com",
      "José cuello"
    ],
    ["d991a71b86cb7f920c5526fb5f6d56ec", "carlamrodriguez7@gmail.com", "Carla"],
    ["4ccf35247c9a2fd65d983a8c4a5ea132", "normabromero@hotmail.com", "Norma"],
    [
      "b1b89e5b86ad22f0826a2e0898368c8e",
      "juampi610_4@hotmail.com",
      "Juan Perich"
    ],
    [
      "53e8c87334823b07482a728cb91a030d",
      "soporte@grupoeon.com.ar",
      "Desconocido"
    ],
    ["23ad8d680ba45ac37ba1382e0bc26573", "gicebreyro@gmail.com", "Gisela"],
    [
      "99b671422efc6f20a3b4248a0a984514",
      "farmaciaminuzzi@hotmail.com",
      "Daniel imas"
    ],
    [
      "f1f972f226753783649b36e9c8b286b8",
      "lenceriabrillodeluna@hotmail.com",
      "Carolina"
    ],
    [
      "59a67d588d4c6d3a165d74fccd7654c6",
      "infotec.serviciotecnicopc@gmail.com",
      "Luciano y Maico"
    ],
    [
      "765c4ebb43a695d867f6258095fb2f09",
      "seba_fullpets@yahoo.com.ar",
      "Otero Sebastián"
    ],
    ["bc17d6262ee630ff37264be84c778f60", "neozootadicor@hotmail.com", "Franco"],
    [
      "07c95cd9963404983eea2d827e005700",
      "juanvillar3030@gmail.com",
      "Sushai Furquez"
    ],
    [
      "de5903440a37776811af15f0df9a4bdf",
      "daniochoaaa12@gmail.com",
      "Daniela ochoa"
    ]
  ];

  const createOwners = async () => {
    Promise.all(
      users.map(user => {
        const id = user[0];
        const email = user[1];
        const name = user[2];
        const _db = $db.database;
        return _db
          .collection("owners")
          .doc(id)
          .set({ name, email });
      })
    );
  };

  const linkBusinesses = async () => {
    const _db = $db.database;
    const query = await _db.collection("approved_businesses").get();
    const { docs } = query;
    docs.forEach(doc => (doc._data = doc.data()));
    docs.forEach(doc => {
      const owner = users.filter(user => user[1] === doc._data.owner_email)[0];
      if (owner) {
        _db
          .collection("approved_businesses")
          .doc(doc.id)
          .update({ owner_id: owner[0] });
      }
    });
  };

  onMount(async () => {
    await createOwners();
    await linkBusinesses();
  });
</script>
