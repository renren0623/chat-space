json.id @message.id
json.text @message.text
json.name @message.user.name
json.created_at @message.created_at.to_s
json.image @message.image.url
