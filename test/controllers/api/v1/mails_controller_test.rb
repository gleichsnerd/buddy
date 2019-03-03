require 'test_helper'

class Api::V1::MailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api/v1_mail = api/v1_mails(:one)
  end

  test "should get index" do
    get api/v1_mails_url, as: :json
    assert_response :success
  end

  test "should create api/v1_mail" do
    assert_difference('Api::V1::Mail.count') do
      post api/v1_mails_url, params: { api/v1_mail: { mailbox_id: @api/v1_mail.mailbox_id, message: @api/v1_mail.message, subject: @api/v1_mail.subject } }, as: :json
    end

    assert_response 201
  end

  test "should show api/v1_mail" do
    get api/v1_mail_url(@api/v1_mail), as: :json
    assert_response :success
  end

  test "should update api/v1_mail" do
    patch api/v1_mail_url(@api/v1_mail), params: { api/v1_mail: { mailbox_id: @api/v1_mail.mailbox_id, message: @api/v1_mail.message, subject: @api/v1_mail.subject } }, as: :json
    assert_response 200
  end

  test "should destroy api/v1_mail" do
    assert_difference('Api::V1::Mail.count', -1) do
      delete api/v1_mail_url(@api/v1_mail), as: :json
    end

    assert_response 204
  end
end
