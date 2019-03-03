class Letter < ApplicationRecord
  belongs_to :mailbox
  belongs_to :sender
  belongs_to :recipient
end
