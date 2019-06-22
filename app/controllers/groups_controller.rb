class GroupsController < ApplicationController

before_action :set_group, only: [:edit, :update]

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(groups_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました。'
    else
      render :new
    end
  end

  def edit
    if @group.update(groups_params)
      redirect_to group_message_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  def update
  end

  private
    def groups_params
    params.require(:group).permit(:name, {:user_ids => []})
    end

    def group_set
      @group = Group.find(params[:id])
    end
end
