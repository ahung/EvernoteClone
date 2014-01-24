require 'spec_helper'

describe Tag do
  it { should validate_presence_of(:name)}
  it { should validate_presence_of(:user_id)}
  
  describe "associations" do
    it { should belong_to(:user)}
    it { should have_many(:tagged_notes)}
    it { should have_many(:notes)}
  end
end