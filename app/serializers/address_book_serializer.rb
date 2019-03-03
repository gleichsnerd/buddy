class AddressBookSerializer < ActiveModel::Serializer
  attributes :id, :mailbox
  has_one :user
  has_one :mailbox

  def mailbox
    AddressBookMailboxSerializer.new(object.mailbox).attributes
  end
end
