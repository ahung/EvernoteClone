require 'spec_helper'

describe Note do
  it { should validate_presence_of(:title)}
  it { should validate_presence_of(:user_id)}
  it { should_not validate_presence_of(:body)}
  
  describe "associations" do
    it { should belong_to(:user)}
    it { should belong_to(:notebook)}
    it { should have_many(:tagged_notes)}
    it { should have_many(:tags)}
  end
end