json.id @message.id
json.user_name @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d(%a) %T")
json.content @message.content
json.image @message.image.url