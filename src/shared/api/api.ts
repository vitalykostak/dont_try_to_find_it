import axios from 'axios'

export const $api = axios.create({
    headers: {
        'X-Parse-Application-Id': 'zsSkPsDYTc2hmphLjjs9hz2Q3EXmnSxUyXnouj1I', // This is the fake app's application id
        'X-Parse-Master-Key': '4LuCXgPPXXO2sU5cXm6WwpwzaKyZpo3Wpj4G4xXK', // This is the fake app's readonly master key
        'Content-Type': 'application/json'
    }
})
