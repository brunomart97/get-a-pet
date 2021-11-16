import api from '../utils/api';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function useAuth() {
  async function register(user) {
    try {
      const data = await api.post('/use/register', user)
      .then((response) => {
        return response.data;
      })

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return { register };
}