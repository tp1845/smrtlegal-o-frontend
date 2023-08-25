'use client'
import Button from '@/components/button';
import GoogleSVG from '@/assets/google.svg';
import * as api from '@/api'
import { setCookie } from '@/utils/helpers'

export default function GoogleAuthBtn() {
    const handleGoogle = () => {
        api
            .googleauth()
            .then(data => data.json())
            .then(({ data }) => {
                const params = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
                const win = window.open(data, "_blank", params);
               
                window.addEventListener('message', function(event) {
                    win.close()
                    let { data } = event;
                    data = JSON.parse(data);

                    localStorage.setItem('user', JSON.stringify(data.user))
                    localStorage.setItem('token', data.token)

                    setCookie('token', data.token, 86400)
                    location.href = "/dashboard"
                }, false)
            })
    }

    return (
        <Button 
            label="Continue with Google"
            className="bg-white !text-[#222] !font-normal shadow"
            icon={GoogleSVG}
            onClick={handleGoogle}
        ></Button>
    );
}