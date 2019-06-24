class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :text, preference: true, unless: :image?
end
