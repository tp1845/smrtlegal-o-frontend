"use client";
import React, {useState, useEffect} from 'react';
import LogoSVG from '@/assets/logo.svg';
import Link from 'next/link'
import Image from 'next/image';

import { useRouter } from 'next/navigation'

export default function TermsAndConditionsAndPrivacyPolicy() {
    const [tab, setTab] = useState('terms-and-conditions');
    const { back, push } = useRouter();

    const handleBack = (e) => {
        e.preventDefault();
        push('/signup')
    }

    useEffect(() => {
        const url = new URLSearchParams(location.search);
        const queryTab = url.get('tab');
        
        if (queryTab && ['terms-and-conditions', 'privacy-policy'].includes(queryTab)) {
            setTab(queryTab);
            // window.history.pushState({}, document.title, location.pathname);
        }
    }, 0);

    return (<div className="bg-[#F6FAFF] min-h-screen  px-[30px] lg:px-0">
        <div className="container mx-auto pt-[60px]  max-w-[774px] pb-[50px]">
            <div className='text-left text-[14px] opacity-[0.7]'>
                <a href="#" onClick={handleBack} className='flex items-center'>
                    <svg className='w-3 h-3 mr-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                    Back
                </a>
            </div>
            <div className="grid grid-cols-[1fr_1fr] gap-[15px] justify-center items-center">
                <a href="#" onClick={() => setTab('terms-and-conditions')} className={`py-[10px] border-b-[4px] ${tab == 'terms-and-conditions' ? 'border-b-[#4ECFE0] font-bold' : 'border-b-[#E5E5E5] font-normal'} text-center `}>Terms & Conditions</a>
                <a href="#" onClick={() => setTab('privacy-policy')} className={`py-[10px] border-b-[4px] ${tab == 'privacy-policy' ? 'border-b-[#4ECFE0] font-bold' : 'border-b-[#E5E5E5] font-normal'} text-center`}>Privacy Policy</a>
            </div>
            {
                tab == 'terms-and-conditions' ? 
                    <div className="text-[#222]">
                        <h1 className="mt-[30px] text-[32px] font-bold mb-[12px]">Terms & Conditions</h1>
                        <p className="text-[#8792A8] text-[14px] mb-[12px]">By using Sounding Board you agree that you are familiar with Terms & Conditions of our services and accept them</p>
                        <span className="text-[14px] text-[#B8C2CC] italic">Last modified: March 2022</span>
                
                        <p className="pt-[32px]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Turpis nunc eget lorem dolor sed viverra. Vitae ultricies leo integer malesuada nunc vel risus. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Mattis rhoncus urna neque viverra justo. Natoque penatibus et magnis dis parturient montes nascetur. Aliquam ultrices sagittis orci a scelerisque. Ac tortor vitae purus faucibus ornare suspendisse. Eget nunc lobortis mattis aliquam. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Mattis molestie a iaculis at.
                        </p>
                        <h4 className="pt-[32px] pb-[16px] font-bold text-[20px]">1. Definitions</h4>
                        <p>
                            Auctor augue mauris augue neque gravida in fermentum et sollicitudin. Praesent tristique magna sit amet purus gravida quis blandit. Velit sed ullamcorper morbi tincidunt ornare massa. Elit pellentesque habitant morbi tristique senectus et netus. Bibendum arcu vitae elementum curabitur vitae nunc. Eu mi bibendum neque egestas congue. Aliquet sagittis id consectetur purus ut faucibus. Ut tortor pretium viverra suspendisse potenti. Gravida cum sociis natoque penatibus et. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Ultricies leo integer malesuada nunc vel risus. Imperdiet massa tincidunt nunc pulvinar sapien et. Leo duis ut diam quam nulla. Fermentum iaculis eu non diam phasellus vestibulum. Mauris vitae ultricies leo integer. In hac habitasse platea dictumst vestibulum rhoncus. Sed libero enim sed faucibus turpis in eu mi bibendum. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Sagittis id consectetur purus ut faucibus pulvinar elementum. Nec sagittis aliquam malesuada bibendum arcu.
                        </p>
                        <h4 className="pt-[32px] pb-[16px] font-bold text-[20px]">2. Acceptance</h4>
                        <p>
                            Auctor augue mauris augue neque gravida in fermentum et sollicitudin. Praesent tristique magna sit amet purus gravida quis blandit. Velit sed ullamcorper morbi tincidunt ornare massa. Elit pellentesque habitant morbi tristique senectus et netus. Bibendum arcu vitae elementum curabitur vitae nunc. Eu mi bibendum neque egestas congue. Aliquet sagittis id consectetur purus ut faucibus. Ut tortor pretium viverra suspendisse potenti. Gravida cum sociis natoque penatibus et. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Ultricies leo integer malesuada nunc vel risus. Imperdiet massa tincidunt nunc pulvinar sapien et. Leo duis ut diam quam nulla. Fermentum iaculis eu non diam phasellus vestibulum. Mauris vitae ultricies leo integer. In hac habitasse platea dictumst vestibulum rhoncus. Sed libero enim sed faucibus turpis in eu mi bibendum. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Sagittis id consectetur purus ut faucibus pulvinar elementum. Nec sagittis aliquam malesuada bibendum arcu.
                        </p>
                    </div>:
                    <div className="text-[#222]">
                        <h1 className="mt-[30px] text-[32px] font-bold mb-[12px]">Privacy Policy</h1>
                        <p className="text-[#8792A8] text-[14px] mb-[12px]">While using Sounding Board you agree that you are familiar with Privacy Policy of our service and accept it</p>
                        <span className="text-[14px] text-[#B8C2CC] italic">Last modified: March 2022</span>
                
                        <p className="pt-[32px]">
                            In our privacy policy (“policy”) we explain how we process your personal data, incl. what we use it for and how we store and protect it. We do that because we care about your privacy. ‍
                        </p>
                        <h4 className="pt-[32px] pb-[16px] font-bold text-[20px]">1. Who we are</h4>
                        <p>
                            Auctor augue mauris augue neque gravida in fermentum et sollicitudin. Praesent tristique magna sit amet purus gravida quis blandit. Velit sed ullamcorper morbi tincidunt ornare massa. Elit pellentesque habitant morbi tristique senectus et netus. Bibendum arcu vitae elementum curabitur vitae nunc. Eu mi bibendum neque egestas congue. Aliquet sagittis id consectetur purus ut faucibus. Ut tortor pretium viverra suspendisse potenti. Gravida cum sociis natoque penatibus et. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Ultricies leo integer malesuada nunc vel risus. Imperdiet massa tincidunt nunc pulvinar sapien et. Leo duis ut diam quam nulla. Fermentum iaculis eu non diam phasellus vestibulum. Mauris vitae ultricies leo integer. In hac habitasse platea dictumst vestibulum rhoncus. Sed libero enim sed faucibus turpis in eu mi bibendum. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Sagittis id consectetur purus ut faucibus pulvinar elementum. Nec sagittis aliquam malesuada bibendum arcu.
                        </p>
                        <h4 className="pt-[32px] pb-[16px] font-bold text-[20px]">2. Why, what and for long we process your data</h4>
                        <p>
                            Auctor augue mauris augue neque gravida in fermentum et sollicitudin. Praesent tristique magna sit amet purus gravida quis blandit. Velit sed ullamcorper morbi tincidunt ornare massa. Elit pellentesque habitant morbi tristique senectus et netus. Bibendum arcu vitae elementum curabitur vitae nunc. Eu mi bibendum neque egestas congue. Aliquet sagittis id consectetur purus ut faucibus. Ut tortor pretium viverra suspendisse potenti. Gravida cum sociis natoque penatibus et. Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. Ultricies leo integer malesuada nunc vel risus. Imperdiet massa tincidunt nunc pulvinar sapien et. Leo duis ut diam quam nulla. Fermentum iaculis eu non diam phasellus vestibulum. Mauris vitae ultricies leo integer. In hac habitasse platea dictumst vestibulum rhoncus. Sed libero enim sed faucibus turpis in eu mi bibendum. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Sagittis id consectetur purus ut faucibus pulvinar elementum. Nec sagittis aliquam malesuada bibendum arcu.
                        </p>
                    </div>
            }
        </div>
    </div>);
}