class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User

  after_create :create_first_mailbox

  validates :name, presence: true

  has_many :mailboxes
  has_many :address_books

  private
  def create_first_mailbox
    Mailbox.create(user: self, alias: "My first mailbox")
  end
end
