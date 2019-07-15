json.content      @message.content
json.name         @message.user.name
json.image_url    @message.image.url
json.image        @message.image
json.date         @message.created_at.strftime("%Y/%m/%d %H:%M")