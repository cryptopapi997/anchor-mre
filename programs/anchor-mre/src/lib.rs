use anchor_lang::prelude::*;

declare_id!("Dmnn6mmGwT45Wp88uyXuY9Kb5qxWhBe43iCFJAvn1oGy");

#[program]
pub mod anchor_mre {
    use super::*;

    pub fn create_demo(ctx: Context<CreateDemo>, num1: u64) -> Result<()> {
        crate::create_demo(ctx, num1)
    }

    pub fn demo(ctx: Context<Demo>, num0: u64, num1: u64) -> Result<()> {
        crate::demo(ctx, num0, num1)
    }
}

#[derive(Accounts)]
#[instruction(_num1 : u64)]
pub struct CreateDemo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(init, payer = user, space = 8, seeds = [b"Demo".as_ref(), _num1.to_le_bytes().as_ref()], bump)]
    pub demo: Account<'info, DemoAccount>,
    pub system_program: Program<'info, System>,
}

pub fn create_demo(_ctx: Context<CreateDemo>, _num1: u64) -> Result<()> {
    Ok(())
}

#[derive(Accounts)]
#[instruction(_num1 : u64)]
pub struct Demo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(seeds = [b"Demo".as_ref(), _num1.to_le_bytes().as_ref()], bump)]
    pub demo: Account<'info, DemoAccount>,
}

pub fn demo(_ctx: Context<Demo>, _num0: u64, _num1: u64) -> Result<()> {
    Ok(())
}

#[account]
pub struct DemoAccount {}
