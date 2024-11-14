import { create} from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth';

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async(email, password,name, role) => {
    set({isLoading: true, error: null});
    try{
      const response = await axios.post(`${API_URL}/signup`, {email, password, name, role});
      set({user: response.data.user, isAuthenticated: true, isLoading: false});
    } catch(e){
      set({error: e.response.data.message || 'Error signing up', isLoading: false});
      throw e;
    }
  }
}))
