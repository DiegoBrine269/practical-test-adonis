import axios from 'axios'
import env from '#start/env'

const api = axios.create({
  baseURL: env.get('API_URL'),
  headers: {
    'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
    'Content-Type': 'application/json',
    'x-rapidapi-key': env.get('RAPID_API_KEY'),
  },
})

export default class VideoService {
  private async request(path: string, params: Record<string, any>) {
    try {
      const { data } = await api.get(path, { params })
      return data
    } catch (error: any) {
      console.log(error.response?.status)
      console.log(error.response?.data)
      throw error
    }
  }

  search(query: string, channelId: string) {
    return this.request('/search', {
      q: query,
      channelId: channelId,
      part: 'snippet',
      maxResults: 50,
      regionCode: 'MX',
    })
  }

  comments(id: string) {
    return this.request('/commentThreads', {
      videoId: id,
      part: 'snippet',
    })
  }
    
  channel(id: string) {
    return this.request('/channels', {
      id: id,
      part: 'snippet,statistics',
    })
  }
  
}