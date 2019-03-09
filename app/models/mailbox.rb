class Mailbox < ApplicationRecord
    belongs_to :user
    has_many :letters
end
