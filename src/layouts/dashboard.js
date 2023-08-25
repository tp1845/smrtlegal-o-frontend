'use client';
import React, { useEffect, useState } from 'react';
import * as api from '@/api'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'

import { setCookie } from '@/utils/helpers'
import UserContext from '@/context/user';

export default function DashboardLayout({ children }) {

  const [user, setUser] = useState({});

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      api
        .me()
        .then(data => data.json())
        .then(data => {
          setUser(data.user ?? {});
          connectToPusher(data.user ?? {});
        })
      return;
    }
    setUser(JSON.parse(storedUser));
    connectToPusher(JSON.parse(storedUser));

    api.roles()
      .then(data => data.json())
      .then((data) => {
        if (data && data.data) {
          const roles = [
            ...data.data.map(role => ({ label: role.name, value: role.id }))
          ]
          setRoles(roles)
        }
      })
  }, [])

  const connectToPusher = (user) => {
    api.initPusher(user);
  }

  const handleLogout = () => {
    localStorage.setItem('user', '')
    localStorage.setItem('token', '')

    setCookie('token', '', 0)

    location.href = '/signin'
  }

  return (
    <div>
      <Navbar user={user} roles={roles} />
      <Sidebar user={user} logout={handleLogout} />
      <div className="bg-[#F5F5F5] min-h-screen">
        <div>
          <UserContext.Provider value={{ user, setUser, roles }}>
            {
              children
            }
          </UserContext.Provider>
        </div>
      </div>
    </div>
  );
}