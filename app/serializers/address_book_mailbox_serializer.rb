class AddressBookMailboxSerializer < ActiveModel::Serializer
  attributes :id, :alias, :owner

  def owner
    AddressBookMailboxOwnerSerializer.new(object.user).attributes
  end
end
