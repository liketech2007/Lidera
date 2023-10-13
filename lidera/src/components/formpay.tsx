"use client"
import { useState } from "react"
import { supabase } from "../utils/supabase"

export function FormPay() {
  const [url, setUrl] = useState("")
  const [data, setData] = useState("")
  const verificationPay = async () => {
    const IBAN = /AO060040000093684573 10 158/
    const valor = /10\.000,00/
    const hora = /(\d{2}:\d{2}:\d{2})/
    const date = /(\d{2}\/\d{2}\/\d{4})/
    const IBANCliente = /[A-Z]{2}\d{2}\s\d{14}/;

    const verificationIBAN = IBAN.test(data)
    const verificationValor = valor.test(data)
    const searchHora = data.match(hora)
    const searchDate = data.match(date)
    const searchIBANCliente = data.match(IBANCliente)

    const datapay = {
      IBAN: verificationIBAN, valor: verificationValor, data: searchDate?.[0],
      hora: searchHora?.[0], IBANClient: searchIBANCliente?.[0],
      name: "oscar",
      telefone: "946703116"
    }

    if (datapay.IBAN === true && datapay.valor === true) {
      const resfilter = await supabase
        .from('client')
        .select()
        .eq('IBAN', datapay.IBAN)
        .eq('valor', datapay.valor)
        .eq("date", datapay.data)
        .eq("hora", datapay.hora)
        .eq("IBANCliente", datapay.IBANClient)

        const payExists = resfilter.data !== null ? resfilter.data : []
        
      if (payExists.length == 0) {

        const resInsert = await supabase
          .from('client')
            .insert([
              {
                IBAN:datapay.IBAN,
                valor:datapay.valor,
                date: datapay.data,
                hora: datapay.hora,
                IBANCliente: datapay.IBANClient,
                name: datapay.name,
                telefone: datapay.telefone
              },
                  ])
          .select()
        
          console.log("pagamento verificado com sucesso")
        
      } else {
        console.log("Esse pagamento já foi verificado.")
      }

    }else {
      console.log("informações incorrectas")
    }
    
  }
  return (
    <div>
      <input type='file' onChange={async(e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          const url = URL.createObjectURL(file)
          setUrl(url)
          const urlApi = 'https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert';
          
          const data = new FormData();
          data.append('file', file);
          data.append('page', '1');
          
          const options = {
            method: 'POST', headers: {
              'X-RapidAPI-Key': '38b70d2c00msh63f6624ddd518abp1bb9bajsn46c9697bf823',
              
              'X-RapidAPI-Host': 'pdf-to-text-converter.p.rapidapi.com'
            },
            body: data
          };
          try {
            const response = await fetch(urlApi, options);
            const result = await response.text();
            setData(result)
          } catch (error)
          {
            console.error(error);
          }
          
        }
      }} /> 
      {
        data.length > 1 && (
          <button onClick={async () => {
            await verificationPay()
          }}>Verificar pagamento</button>
        )
      }
    </div>
  )
}