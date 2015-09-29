class Task < ActiveRecord::Base
  default_scope { order('priority ASC') }
  after_create :assign_priority

  def assign_priority
    self.priority = self.id
    self.save
  end

end