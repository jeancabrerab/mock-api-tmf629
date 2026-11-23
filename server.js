const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "Mock API TMF629 funcionando correctamente"
  });
});

app.get("/customer", (req, res) => {
  const engagedPartyId = req.query["engagedParty.id"];

  if (!engagedPartyId) {
    return res.status(400).json({
      code: "400",
      reason: "Parámetro obligatorio no informado",
      message: "Debe enviar el parámetro engagedParty.id"
    });
  }

  if (engagedPartyId !== "DNI-11111111") {
    return res.status(404).json({
      code: "404",
      reason: "Cliente no encontrado",
      message: "No existe un cliente para el identificador informado"
    });
  }

  return res.status(200).json([
    {
      "@type": "Customer",
      "id": "CUS-11111111",
      "href": "/customer/CUS-11111111",
      "name": "Jean Cabrera",
      "role": "Cliente",
      "engagedParty": {
        "@type": "PartyRef",
        "@referredType": "Individual",
        "id": "DNI-11111111",
        "name": "Jean Cabrera"
      },
      "characteristic": [
        {
          "@type": "StringCharacteristic",
          "name": "segment",
          "valueType": "string",
          "value": "Residencial"
        },
        {
          "@type": "StringCharacteristic",
          "name": "creditRiskLevel",
          "valueType": "string",
          "value": "Bajo"
        }
      ],
      "contactMedium": [
        {
          "@type": "PhoneContactMedium",
          "preferred": true,
          "contactType": "celularPrincipal",
          "phoneNumber": "999888777"
        },
        {
          "@type": "EmailContactMedium",
          "preferred": false,
          "contactType": "correoPersonal",
          "emailAddress": "jean.cabrera@demo.com"
        }
      ],
      "status": "Activo",
      "validFor": {
        "startDateTime": "2023-08-10T00:00:00-05:00"
      }
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});