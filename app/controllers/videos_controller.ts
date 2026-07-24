import type { HttpContext } from '@adonisjs/core/http'
import VideoService from '#services/video_service'

export default class VideosController {

  async index({ request }: HttpContext) {
    const q = request.input('q')
    const channelId = request.input('channelId') ?? ''

    const service = new VideoService()

    return await service.search(q, channelId)
  }

  async comments({ request }: HttpContext) {
    const id = request.input('id')

    const service = new VideoService()

    return await service.comments(id)
  }

  async channel({ request }: HttpContext) {
    const id = request.input('id')

    const service = new VideoService()

    return await service.channel(id)
  }

  
}