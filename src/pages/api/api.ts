import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';

// URL de la API de personas
const urlPersonas = 'http://localhost:3000/personas';

/**
 * Controlador para la ruta '/personas'
 * @param {NextApiRequest} req - Objeto de solicitud de la API
 * @param {NextApiResponse} res - Objeto de respuesta de la API
 */
export default async function personas(req: NextApiRequest, res: NextApiResponse) {
    // Realiza una solicitud a la API de personas
    const response = await fetch(urlPersonas);
    
    // Obtiene los datos de respuesta en formato JSON
    const data = await response.json();
    
    // Imprime los datos en la consola
    console.log(data);
    
    // Devuelve los datos como respuesta de la API en formato JSON
    res.status(200).json(data);
}
