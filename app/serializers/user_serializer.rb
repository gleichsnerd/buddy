class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :mailboxes
  has_many :address_books
end
