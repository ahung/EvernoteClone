require 'spec_helper'

describe User do
  context "password too short" do
    let(:incomplete_user) {user = User.new({username: "Test", password: "test"})}
    
    it "validates length of password" do
      expect(incomplete_user).to have_at_least(1).error_on(:password)
    end
  end
  
  it "validates uniqueness of username" do
    user1 = User.create!({username: "Test", password: "password"})
    user2 = User.new({username: "Test", password: "password2"})
    
    expect(user2).not_to be_valid
  end
  
  it { should validate_presence_of(:username)}
  it { should validate_presence_of(:password_digest)}
  
  describe "associations" do
    it { should have_many(:notebooks)}
    it { should have_many(:notes)}
    it { should have_many(:tags)}
  end
end
