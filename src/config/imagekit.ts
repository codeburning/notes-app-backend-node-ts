 const imageKitconfig ={
    publicKey :"public_6oeT72Gg0m35ZhLXxeTI6WwQpBI=",
    privateKey:"private_e2VrS7dPJ4U7ZnexRx0r3SQo2zA=",
    urlEndPoint:"https://ik.imagekit.io/burningcode"
}
import ImageKit from "imagekit"
export const imagekit = new ImageKit({
    publicKey:imageKitconfig.publicKey,
    privateKey:imageKitconfig.privateKey,
    urlEndpoint:imageKitconfig.urlEndPoint
})