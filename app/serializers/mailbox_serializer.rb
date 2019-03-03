class MailboxSerializer < ActiveModel::Serializer
  attributes :id, :alias
  has_one :user
end
