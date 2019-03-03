class LetterSerializer < ActiveModel::Serializer
  attributes :id, :subject, :body
  has_one :mailbox
  has_one :sender
  has_one :recipient
end
